import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { arg, booleanArg, floatArg, idArg, intArg, stringArg, mutationType, enumType, mutationField } from 'nexus'
import { APP_SECRET, getUserId } from '../utils'
import { createWriteStream } from 'fs'
import * as sync from 'mkdirp'
import * as shortid from 'shortid'
import { resolve } from 'path'

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.photon.users.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, context) => {
        const user = await context.photon.users.findOne({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
      },
      resolve: (parent, { title, content }, ctx) => {
        const userId = getUserId(ctx)
        return ctx.photon.posts.create({
          data: {
            title,
            content,
            published: false,
            author: { connect: { id: userId } },
          },
        })
      },
    })

    t.field('deletePost', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.posts.delete({
          where: {
            id,
          },
        })
      },
    })

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.posts.update({
          where: { id },
          data: { published: true },
        })
      },
    })

    t.field('uploadFile', {
      type: 'File',
      args:{
        file: arg({type:"Upload", required:true})
      },
      resolve: async (parent, { file }, ctx ) => {

        const uploadDir = resolve(__dirname, '../documents')
        sync(uploadDir)

        const { stream, filename, mimetype, encoding } = await file
        const id = shortid.generate() + '-' + filename
        const path = `${uploadDir}/${id}-${filename}`
        
        const uploadDer = new Promise((resolve, reject) =>
            stream
              .pipe(createWriteStream(path))
              .on('finish', () => resolve({ id, path }))
              .on('error', reject),
          )

        // Sync with Prisma
        const data = {
          filename,
          mimetype,
          encoding,
          path,
        }

        return await ctx.photon.files.create({
          data
        })

      }
    })

  },
})
