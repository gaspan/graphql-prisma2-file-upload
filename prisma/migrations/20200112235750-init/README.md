# Migration `20200112235750-init`

This migration has been generated by Gentur Ariyadi Siddiq at 1/12/2020, 11:57:50 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Post" (
  "content" text    ,
  "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "id" text  NOT NULL  ,
  "published" boolean  NOT NULL DEFAULT false ,
  "title" text  NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."User" (
  "email" text  NOT NULL DEFAULT '' ,
  "id" text  NOT NULL  ,
  "name" text    ,
  "password" text  NOT NULL DEFAULT '' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."File" (
  "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "encoding" text  NOT NULL DEFAULT '' ,
  "filename" text  NOT NULL DEFAULT '' ,
  "id" text  NOT NULL  ,
  "mimetype" text  NOT NULL DEFAULT '' ,
  "path" text  NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

ALTER TABLE "public"."Post" ADD COLUMN "author" text    REFERENCES "public"."User"("id") ON DELETE SET NULL;

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "File.path" ON "public"."File"("path")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200112235750-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,36 @@
+generator photon {
+  provider = "photonjs"
+}
+
+datasource db {
+  provider = "postgresql"
+  url      = "postgresql://prisma:prisma@localhost:5432/uploadfile?schema=public"
+}
+
+model Post {
+  id        String   @default(cuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  published Boolean  @default(false)
+  title     String
+  content   String?
+  author    User?
+}
+
+model User {
+  id       String  @default(cuid()) @id
+  email    String  @unique
+  password String
+  name     String?
+  posts    Post[]
+}
+
+model File {
+  id   String @default(cuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  filename String
+  mimetype String
+  encoding String
+  path String @unique
+}
```

