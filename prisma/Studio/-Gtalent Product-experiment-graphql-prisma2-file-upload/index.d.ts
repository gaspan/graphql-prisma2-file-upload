import { DMMF, DMMFClass, Engine } from './runtime';
/**
 * Utility Types
 */
export declare type Enumerable<T> = T | Array<T>;
export declare type MergeTruthyValues<R extends object, S extends object> = {
    [key in keyof S | keyof R]: key extends false ? never : key extends keyof S ? S[key] extends false ? never : S[key] : key extends keyof R ? R[key] : never;
};
export declare type CleanupNever<T> = {
    [key in keyof T]: T[key] extends never ? never : key;
}[keyof T];
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * A PhotonRequestError is an error that is thrown in conjunction to a concrete query that has been performed with Photon.js.
 */
export declare class PhotonRequestError extends Error {
    message: string;
    code?: string | undefined;
    meta?: any;
    constructor(message: string, code?: string | undefined, meta?: any);
}
declare class PhotonFetcher {
    private readonly photon;
    private readonly engine;
    private readonly debug;
    private readonly hooks?;
    constructor(photon: Photon, engine: Engine, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, path?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}
/**
 * Client
**/
export declare type Datasources = {
    db?: string;
};
export declare type LogLevel = 'INFO' | 'WARN' | 'QUERY';
export declare type LogOption = LogLevel | {
    level: LogLevel;
    /**
     * @default 'stdout'
     */
    emit?: 'event' | 'stdout';
};
export interface PhotonOptions {
    datasources?: Datasources;
    /**
     * @default false
     */
    log?: boolean | LogOption[];
    debug?: any;
    /**
     * You probably don't want to use this. `__internal` is used by internal tooling.
     */
    __internal?: {
        debug?: boolean;
        hooks?: Hooks;
        engine?: {
            cwd?: string;
            binaryPath?: string;
        };
    };
}
export declare type Hooks = {
    beforeRequest?: (options: {
        query: string;
        path: string[];
        rootField?: string;
        typeName?: string;
        document: any;
    }) => any;
};
export declare class Photon {
    private fetcher;
    private readonly dmmf;
    private readonly engine;
    private connectionPromise?;
    constructor(options?: PhotonOptions);
    private connectEngine;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    get posts(): PostDelegate;
    get users(): UserDelegate;
    get files(): FileDelegate;
}
export declare const OrderByArg: {
    asc: "asc";
    desc: "desc";
};
export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg];
/**
 * Model Post
 */
export declare type Post = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    title: string;
    content: string | null;
};
export declare type PostScalars = 'id' | 'createdAt' | 'updatedAt' | 'published' | 'title' | 'content';
export declare type PostSelect = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    published?: boolean;
    title?: boolean;
    content?: boolean;
    author?: boolean | UserSelectArgsOptional;
};
export declare type PostInclude = {
    author?: boolean | UserIncludeArgsOptional;
};
declare type PostDefault = {
    id: true;
    createdAt: true;
    updatedAt: true;
    published: true;
    title: true;
    content: true;
};
declare type PostGetSelectPayload<S extends boolean | PostSelect> = S extends true ? Post : S extends PostSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends PostScalars ? Post[P] : P extends 'author' ? UserGetSelectPayload<ExtractUserSelectArgs<S[P]>> | null : never;
} : never;
declare type PostGetIncludePayload<S extends boolean | PostInclude> = S extends true ? Post : S extends PostInclude ? {
    [P in CleanupNever<MergeTruthyValues<PostDefault, S>>]: P extends PostScalars ? Post[P] : P extends 'author' ? UserGetIncludePayload<ExtractUserIncludeArgs<S[P]>> | null : never;
} : never;
export interface PostDelegate {
    <T extends FindManyPostArgs>(args?: Subset<T, FindManyPostArgs>): T extends FindManyPostArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPostSelectArgs ? Promise<Array<PostGetSelectPayload<ExtractFindManyPostSelectArgs<T>>>> : T extends FindManyPostIncludeArgs ? Promise<Array<PostGetIncludePayload<ExtractFindManyPostIncludeArgs<T>>>> : Promise<Array<Post>>;
    findOne<T extends FindOnePostArgs>(args: Subset<T, FindOnePostArgs>): T extends FindOnePostArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOnePostSelectArgs ? Promise<PostGetSelectPayload<ExtractFindOnePostSelectArgs<T>> | null> : T extends FindOnePostIncludeArgs ? Promise<PostGetIncludePayload<ExtractFindOnePostIncludeArgs<T>> | null> : PostClient<Post | null>;
    findMany<T extends FindManyPostArgs>(args?: Subset<T, FindManyPostArgs>): T extends FindManyPostArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPostSelectArgs ? Promise<Array<PostGetSelectPayload<ExtractFindManyPostSelectArgs<T>>>> : T extends FindManyPostIncludeArgs ? Promise<Array<PostGetIncludePayload<ExtractFindManyPostIncludeArgs<T>>>> : Promise<Array<Post>>;
    create<T extends PostCreateArgs>(args: Subset<T, PostCreateArgs>): T extends PostCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends PostSelectCreateArgs ? Promise<PostGetSelectPayload<ExtractPostSelectCreateArgs<T>>> : T extends PostIncludeCreateArgs ? Promise<PostGetIncludePayload<ExtractPostIncludeCreateArgs<T>>> : PostClient<Post>;
    delete<T extends PostDeleteArgs>(args: Subset<T, PostDeleteArgs>): T extends PostDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends PostSelectDeleteArgs ? Promise<PostGetSelectPayload<ExtractPostSelectDeleteArgs<T>>> : T extends PostIncludeDeleteArgs ? Promise<PostGetIncludePayload<ExtractPostIncludeDeleteArgs<T>>> : PostClient<Post>;
    update<T extends PostUpdateArgs>(args: Subset<T, PostUpdateArgs>): T extends PostUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends PostSelectUpdateArgs ? Promise<PostGetSelectPayload<ExtractPostSelectUpdateArgs<T>>> : T extends PostIncludeUpdateArgs ? Promise<PostGetIncludePayload<ExtractPostIncludeUpdateArgs<T>>> : PostClient<Post>;
    deleteMany<T extends PostDeleteManyArgs>(args: Subset<T, PostDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends PostUpdateManyArgs>(args: Subset<T, PostUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends PostUpsertArgs>(args: Subset<T, PostUpsertArgs>): T extends PostUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends PostSelectUpsertArgs ? Promise<PostGetSelectPayload<ExtractPostSelectUpsertArgs<T>>> : T extends PostIncludeUpsertArgs ? Promise<PostGetIncludePayload<ExtractPostIncludeUpsertArgs<T>>> : PostClient<Post>;
    count(): Promise<number>;
}
export declare class PostClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectArgs ? Promise<UserGetSelectPayload<ExtractUserSelectArgs<T>> | null> : T extends UserIncludeArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeArgs<T>> | null> : UserClient<User | null>;
    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Post findOne
 */
export declare type FindOnePostArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostSelectArgs = {
    select: PostSelect;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostSelectArgsOptional = {
    select?: PostSelect | null;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostIncludeArgs = {
    include: PostInclude;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostIncludeArgsOptional = {
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
};
export declare type ExtractFindOnePostSelectArgs<S extends undefined | boolean | FindOnePostSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOnePostSelectArgs ? S['select'] : true;
export declare type ExtractFindOnePostIncludeArgs<S extends undefined | boolean | FindOnePostIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOnePostIncludeArgs ? S['include'] : true;
/**
 * Post findMany
 */
export declare type FindManyPostArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostSelectArgs = {
    select: PostSelect;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostSelectArgsOptional = {
    select?: PostSelect | null;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostIncludeArgs = {
    include: PostInclude;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostIncludeArgsOptional = {
    include?: PostInclude | null;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyPostSelectArgs<S extends undefined | boolean | FindManyPostSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyPostSelectArgs ? S['select'] : true;
export declare type ExtractFindManyPostIncludeArgs<S extends undefined | boolean | FindManyPostIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyPostIncludeArgs ? S['include'] : true;
/**
 * Post create
 */
export declare type PostCreateArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
    data: PostCreateInput;
};
export declare type PostCreateArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    data: PostCreateInput;
};
export declare type PostSelectCreateArgs = {
    select: PostSelect;
    data: PostCreateInput;
};
export declare type PostSelectCreateArgsOptional = {
    select?: PostSelect | null;
    data: PostCreateInput;
};
export declare type PostIncludeCreateArgs = {
    include: PostInclude;
    data: PostCreateInput;
};
export declare type PostIncludeCreateArgsOptional = {
    include?: PostInclude | null;
    data: PostCreateInput;
};
export declare type ExtractPostSelectCreateArgs<S extends undefined | boolean | PostSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectCreateArgs ? S['select'] : true;
export declare type ExtractPostIncludeCreateArgs<S extends undefined | boolean | PostIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeCreateArgs ? S['include'] : true;
/**
 * Post update
 */
export declare type PostUpdateArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostUpdateArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostSelectUpdateArgs = {
    select: PostSelect;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostSelectUpdateArgsOptional = {
    select?: PostSelect | null;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostIncludeUpdateArgs = {
    include: PostInclude;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostIncludeUpdateArgsOptional = {
    include?: PostInclude | null;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type ExtractPostSelectUpdateArgs<S extends undefined | boolean | PostSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectUpdateArgs ? S['select'] : true;
export declare type ExtractPostIncludeUpdateArgs<S extends undefined | boolean | PostIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeUpdateArgs ? S['include'] : true;
/**
 * Post updateMany
 */
export declare type PostUpdateManyArgs = {
    data: PostUpdateManyMutationInput;
    where?: PostWhereInput | null;
};
/**
 * Post upsert
 */
export declare type PostUpsertArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostUpsertArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostSelectUpsertArgs = {
    select: PostSelect;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostSelectUpsertArgsOptional = {
    select?: PostSelect | null;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostIncludeUpsertArgs = {
    include: PostInclude;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostIncludeUpsertArgsOptional = {
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type ExtractPostSelectUpsertArgs<S extends undefined | boolean | PostSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectUpsertArgs ? S['select'] : true;
export declare type ExtractPostIncludeUpsertArgs<S extends undefined | boolean | PostIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeUpsertArgs ? S['include'] : true;
/**
 * Post delete
 */
export declare type PostDeleteArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
};
export declare type PostDeleteArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    where: PostWhereUniqueInput;
};
export declare type PostSelectDeleteArgs = {
    select: PostSelect;
    where: PostWhereUniqueInput;
};
export declare type PostSelectDeleteArgsOptional = {
    select?: PostSelect | null;
    where: PostWhereUniqueInput;
};
export declare type PostIncludeDeleteArgs = {
    include: PostInclude;
    where: PostWhereUniqueInput;
};
export declare type PostIncludeDeleteArgsOptional = {
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
};
export declare type ExtractPostSelectDeleteArgs<S extends undefined | boolean | PostSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectDeleteArgs ? S['select'] : true;
export declare type ExtractPostIncludeDeleteArgs<S extends undefined | boolean | PostIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeDeleteArgs ? S['include'] : true;
/**
 * Post deleteMany
 */
export declare type PostDeleteManyArgs = {
    where?: PostWhereInput | null;
};
/**
 * Post without action
 */
export declare type PostArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
};
export declare type PostArgsRequired = {
    select: PostSelect;
    include: PostInclude;
};
export declare type PostSelectArgs = {
    select: PostSelect;
};
export declare type PostSelectArgsOptional = {
    select?: PostSelect | null;
};
export declare type PostIncludeArgs = {
    include: PostInclude;
};
export declare type PostIncludeArgsOptional = {
    include?: PostInclude | null;
};
export declare type ExtractPostSelectArgs<S extends undefined | boolean | PostSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectArgs ? S['select'] : true;
export declare type ExtractPostIncludeArgs<S extends undefined | boolean | PostIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeArgs ? S['include'] : true;
/**
 * Model User
 */
export declare type User = {
    id: string;
    email: string;
    password: string;
    name: string | null;
};
export declare type UserScalars = 'id' | 'email' | 'password' | 'name';
export declare type UserSelect = {
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    posts?: boolean | FindManyPostSelectArgsOptional;
};
export declare type UserInclude = {
    posts?: boolean | FindManyPostIncludeArgsOptional;
};
declare type UserDefault = {
    id: true;
    email: true;
    password: true;
    name: true;
};
declare type UserGetSelectPayload<S extends boolean | UserSelect> = S extends true ? User : S extends UserSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends UserScalars ? User[P] : P extends 'posts' ? Array<PostGetSelectPayload<ExtractFindManyPostSelectArgs<S[P]>>> : never;
} : never;
declare type UserGetIncludePayload<S extends boolean | UserInclude> = S extends true ? User : S extends UserInclude ? {
    [P in CleanupNever<MergeTruthyValues<UserDefault, S>>]: P extends UserScalars ? User[P] : P extends 'posts' ? Array<PostGetIncludePayload<ExtractFindManyPostIncludeArgs<S[P]>>> : never;
} : never;
export interface UserDelegate {
    <T extends FindManyUserArgs>(args?: Subset<T, FindManyUserArgs>): T extends FindManyUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyUserSelectArgs ? Promise<Array<UserGetSelectPayload<ExtractFindManyUserSelectArgs<T>>>> : T extends FindManyUserIncludeArgs ? Promise<Array<UserGetIncludePayload<ExtractFindManyUserIncludeArgs<T>>>> : Promise<Array<User>>;
    findOne<T extends FindOneUserArgs>(args: Subset<T, FindOneUserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneUserSelectArgs ? Promise<UserGetSelectPayload<ExtractFindOneUserSelectArgs<T>> | null> : T extends FindOneUserIncludeArgs ? Promise<UserGetIncludePayload<ExtractFindOneUserIncludeArgs<T>> | null> : UserClient<User | null>;
    findMany<T extends FindManyUserArgs>(args?: Subset<T, FindManyUserArgs>): T extends FindManyUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyUserSelectArgs ? Promise<Array<UserGetSelectPayload<ExtractFindManyUserSelectArgs<T>>>> : T extends FindManyUserIncludeArgs ? Promise<Array<UserGetIncludePayload<ExtractFindManyUserIncludeArgs<T>>>> : Promise<Array<User>>;
    create<T extends UserCreateArgs>(args: Subset<T, UserCreateArgs>): T extends UserCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectCreateArgs ? Promise<UserGetSelectPayload<ExtractUserSelectCreateArgs<T>>> : T extends UserIncludeCreateArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeCreateArgs<T>>> : UserClient<User>;
    delete<T extends UserDeleteArgs>(args: Subset<T, UserDeleteArgs>): T extends UserDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectDeleteArgs ? Promise<UserGetSelectPayload<ExtractUserSelectDeleteArgs<T>>> : T extends UserIncludeDeleteArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeDeleteArgs<T>>> : UserClient<User>;
    update<T extends UserUpdateArgs>(args: Subset<T, UserUpdateArgs>): T extends UserUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectUpdateArgs ? Promise<UserGetSelectPayload<ExtractUserSelectUpdateArgs<T>>> : T extends UserIncludeUpdateArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeUpdateArgs<T>>> : UserClient<User>;
    deleteMany<T extends UserDeleteManyArgs>(args: Subset<T, UserDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Subset<T, UserUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends UserUpsertArgs>(args: Subset<T, UserUpsertArgs>): T extends UserUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectUpsertArgs ? Promise<UserGetSelectPayload<ExtractUserSelectUpsertArgs<T>>> : T extends UserIncludeUpsertArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeUpsertArgs<T>>> : UserClient<User>;
    count(): Promise<number>;
}
export declare class UserClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    posts<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): T extends FindManyPostArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPostSelectArgs ? Promise<Array<PostGetSelectPayload<ExtractFindManyPostSelectArgs<T>>>> : T extends FindManyPostIncludeArgs ? Promise<Array<PostGetIncludePayload<ExtractFindManyPostIncludeArgs<T>>>> : Promise<Array<Post>>;
    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * User findOne
 */
export declare type FindOneUserArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserSelectArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserSelectArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserIncludeArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserIncludeArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type ExtractFindOneUserSelectArgs<S extends undefined | boolean | FindOneUserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneUserSelectArgs ? S['select'] : true;
export declare type ExtractFindOneUserIncludeArgs<S extends undefined | boolean | FindOneUserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneUserIncludeArgs ? S['include'] : true;
/**
 * User findMany
 */
export declare type FindManyUserArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserSelectArgs = {
    select: UserSelect;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserSelectArgsOptional = {
    select?: UserSelect | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserIncludeArgs = {
    include: UserInclude;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserIncludeArgsOptional = {
    include?: UserInclude | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyUserSelectArgs<S extends undefined | boolean | FindManyUserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyUserSelectArgs ? S['select'] : true;
export declare type ExtractFindManyUserIncludeArgs<S extends undefined | boolean | FindManyUserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyUserIncludeArgs ? S['include'] : true;
/**
 * User create
 */
export declare type UserCreateArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    data: UserCreateInput;
};
export declare type UserCreateArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    data: UserCreateInput;
};
export declare type UserSelectCreateArgs = {
    select: UserSelect;
    data: UserCreateInput;
};
export declare type UserSelectCreateArgsOptional = {
    select?: UserSelect | null;
    data: UserCreateInput;
};
export declare type UserIncludeCreateArgs = {
    include: UserInclude;
    data: UserCreateInput;
};
export declare type UserIncludeCreateArgsOptional = {
    include?: UserInclude | null;
    data: UserCreateInput;
};
export declare type ExtractUserSelectCreateArgs<S extends undefined | boolean | UserSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectCreateArgs ? S['select'] : true;
export declare type ExtractUserIncludeCreateArgs<S extends undefined | boolean | UserIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeCreateArgs ? S['include'] : true;
/**
 * User update
 */
export declare type UserUpdateArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserUpdateArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserSelectUpdateArgs = {
    select: UserSelect;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserSelectUpdateArgsOptional = {
    select?: UserSelect | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeUpdateArgs = {
    include: UserInclude;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeUpdateArgsOptional = {
    include?: UserInclude | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type ExtractUserSelectUpdateArgs<S extends undefined | boolean | UserSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectUpdateArgs ? S['select'] : true;
export declare type ExtractUserIncludeUpdateArgs<S extends undefined | boolean | UserIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeUpdateArgs ? S['include'] : true;
/**
 * User updateMany
 */
export declare type UserUpdateManyArgs = {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput | null;
};
/**
 * User upsert
 */
export declare type UserUpsertArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserUpsertArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserSelectUpsertArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserSelectUpsertArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserIncludeUpsertArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserIncludeUpsertArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type ExtractUserSelectUpsertArgs<S extends undefined | boolean | UserSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectUpsertArgs ? S['select'] : true;
export declare type ExtractUserIncludeUpsertArgs<S extends undefined | boolean | UserIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeUpsertArgs ? S['include'] : true;
/**
 * User delete
 */
export declare type UserDeleteArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type UserDeleteArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type UserSelectDeleteArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
};
export declare type UserSelectDeleteArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeDeleteArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeDeleteArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type ExtractUserSelectDeleteArgs<S extends undefined | boolean | UserSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectDeleteArgs ? S['select'] : true;
export declare type ExtractUserIncludeDeleteArgs<S extends undefined | boolean | UserIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeDeleteArgs ? S['include'] : true;
/**
 * User deleteMany
 */
export declare type UserDeleteManyArgs = {
    where?: UserWhereInput | null;
};
/**
 * User without action
 */
export declare type UserArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
};
export declare type UserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
};
export declare type UserSelectArgs = {
    select: UserSelect;
};
export declare type UserSelectArgsOptional = {
    select?: UserSelect | null;
};
export declare type UserIncludeArgs = {
    include: UserInclude;
};
export declare type UserIncludeArgsOptional = {
    include?: UserInclude | null;
};
export declare type ExtractUserSelectArgs<S extends undefined | boolean | UserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectArgs ? S['select'] : true;
export declare type ExtractUserIncludeArgs<S extends undefined | boolean | UserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeArgs ? S['include'] : true;
/**
 * Model File
 */
export declare type File = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    filename: string;
    mimetype: string;
    encoding: string;
    path: string;
};
export declare type FileScalars = 'id' | 'createdAt' | 'updatedAt' | 'filename' | 'mimetype' | 'encoding' | 'path';
export declare type FileSelect = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    filename?: boolean;
    mimetype?: boolean;
    encoding?: boolean;
    path?: boolean;
};
export declare type FileInclude = {};
declare type FileDefault = {
    id: true;
    createdAt: true;
    updatedAt: true;
    filename: true;
    mimetype: true;
    encoding: true;
    path: true;
};
declare type FileGetSelectPayload<S extends boolean | FileSelect> = S extends true ? File : S extends FileSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends FileScalars ? File[P] : never;
} : never;
declare type FileGetIncludePayload<S extends boolean | FileInclude> = S extends true ? File : S extends FileInclude ? {
    [P in CleanupNever<MergeTruthyValues<FileDefault, S>>]: P extends FileScalars ? File[P] : never;
} : never;
export interface FileDelegate {
    <T extends FindManyFileArgs>(args?: Subset<T, FindManyFileArgs>): T extends FindManyFileArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyFileSelectArgs ? Promise<Array<FileGetSelectPayload<ExtractFindManyFileSelectArgs<T>>>> : T extends FindManyFileIncludeArgs ? Promise<Array<FileGetIncludePayload<ExtractFindManyFileIncludeArgs<T>>>> : Promise<Array<File>>;
    findOne<T extends FindOneFileArgs>(args: Subset<T, FindOneFileArgs>): T extends FindOneFileArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneFileSelectArgs ? Promise<FileGetSelectPayload<ExtractFindOneFileSelectArgs<T>> | null> : T extends FindOneFileIncludeArgs ? Promise<FileGetIncludePayload<ExtractFindOneFileIncludeArgs<T>> | null> : FileClient<File | null>;
    findMany<T extends FindManyFileArgs>(args?: Subset<T, FindManyFileArgs>): T extends FindManyFileArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyFileSelectArgs ? Promise<Array<FileGetSelectPayload<ExtractFindManyFileSelectArgs<T>>>> : T extends FindManyFileIncludeArgs ? Promise<Array<FileGetIncludePayload<ExtractFindManyFileIncludeArgs<T>>>> : Promise<Array<File>>;
    create<T extends FileCreateArgs>(args: Subset<T, FileCreateArgs>): T extends FileCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends FileSelectCreateArgs ? Promise<FileGetSelectPayload<ExtractFileSelectCreateArgs<T>>> : T extends FileIncludeCreateArgs ? Promise<FileGetIncludePayload<ExtractFileIncludeCreateArgs<T>>> : FileClient<File>;
    delete<T extends FileDeleteArgs>(args: Subset<T, FileDeleteArgs>): T extends FileDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends FileSelectDeleteArgs ? Promise<FileGetSelectPayload<ExtractFileSelectDeleteArgs<T>>> : T extends FileIncludeDeleteArgs ? Promise<FileGetIncludePayload<ExtractFileIncludeDeleteArgs<T>>> : FileClient<File>;
    update<T extends FileUpdateArgs>(args: Subset<T, FileUpdateArgs>): T extends FileUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends FileSelectUpdateArgs ? Promise<FileGetSelectPayload<ExtractFileSelectUpdateArgs<T>>> : T extends FileIncludeUpdateArgs ? Promise<FileGetIncludePayload<ExtractFileIncludeUpdateArgs<T>>> : FileClient<File>;
    deleteMany<T extends FileDeleteManyArgs>(args: Subset<T, FileDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends FileUpdateManyArgs>(args: Subset<T, FileUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends FileUpsertArgs>(args: Subset<T, FileUpsertArgs>): T extends FileUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends FileSelectUpsertArgs ? Promise<FileGetSelectPayload<ExtractFileSelectUpsertArgs<T>>> : T extends FileIncludeUpsertArgs ? Promise<FileGetIncludePayload<ExtractFileIncludeUpsertArgs<T>>> : FileClient<File>;
    count(): Promise<number>;
}
export declare class FileClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * File findOne
 */
export declare type FindOneFileArgs = {
    select?: FileSelect | null;
    include?: FileInclude | null;
    where: FileWhereUniqueInput;
};
export declare type FindOneFileArgsRequired = {
    select: FileSelect;
    include: FileInclude;
    where: FileWhereUniqueInput;
};
export declare type FindOneFileSelectArgs = {
    select: FileSelect;
    where: FileWhereUniqueInput;
};
export declare type FindOneFileSelectArgsOptional = {
    select?: FileSelect | null;
    where: FileWhereUniqueInput;
};
export declare type FindOneFileIncludeArgs = {
    include: FileInclude;
    where: FileWhereUniqueInput;
};
export declare type FindOneFileIncludeArgsOptional = {
    include?: FileInclude | null;
    where: FileWhereUniqueInput;
};
export declare type ExtractFindOneFileSelectArgs<S extends undefined | boolean | FindOneFileSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneFileSelectArgs ? S['select'] : true;
export declare type ExtractFindOneFileIncludeArgs<S extends undefined | boolean | FindOneFileIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneFileIncludeArgs ? S['include'] : true;
/**
 * File findMany
 */
export declare type FindManyFileArgs = {
    select?: FileSelect | null;
    include?: FileInclude | null;
    where?: FileWhereInput | null;
    orderBy?: FileOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyFileArgsRequired = {
    select: FileSelect;
    include: FileInclude;
    where?: FileWhereInput | null;
    orderBy?: FileOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyFileSelectArgs = {
    select: FileSelect;
    where?: FileWhereInput | null;
    orderBy?: FileOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyFileSelectArgsOptional = {
    select?: FileSelect | null;
    where?: FileWhereInput | null;
    orderBy?: FileOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyFileIncludeArgs = {
    include: FileInclude;
    where?: FileWhereInput | null;
    orderBy?: FileOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyFileIncludeArgsOptional = {
    include?: FileInclude | null;
    where?: FileWhereInput | null;
    orderBy?: FileOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyFileSelectArgs<S extends undefined | boolean | FindManyFileSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyFileSelectArgs ? S['select'] : true;
export declare type ExtractFindManyFileIncludeArgs<S extends undefined | boolean | FindManyFileIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyFileIncludeArgs ? S['include'] : true;
/**
 * File create
 */
export declare type FileCreateArgs = {
    select?: FileSelect | null;
    include?: FileInclude | null;
    data: FileCreateInput;
};
export declare type FileCreateArgsRequired = {
    select: FileSelect;
    include: FileInclude;
    data: FileCreateInput;
};
export declare type FileSelectCreateArgs = {
    select: FileSelect;
    data: FileCreateInput;
};
export declare type FileSelectCreateArgsOptional = {
    select?: FileSelect | null;
    data: FileCreateInput;
};
export declare type FileIncludeCreateArgs = {
    include: FileInclude;
    data: FileCreateInput;
};
export declare type FileIncludeCreateArgsOptional = {
    include?: FileInclude | null;
    data: FileCreateInput;
};
export declare type ExtractFileSelectCreateArgs<S extends undefined | boolean | FileSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FileSelectCreateArgs ? S['select'] : true;
export declare type ExtractFileIncludeCreateArgs<S extends undefined | boolean | FileIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FileIncludeCreateArgs ? S['include'] : true;
/**
 * File update
 */
export declare type FileUpdateArgs = {
    select?: FileSelect | null;
    include?: FileInclude | null;
    data: FileUpdateInput;
    where: FileWhereUniqueInput;
};
export declare type FileUpdateArgsRequired = {
    select: FileSelect;
    include: FileInclude;
    data: FileUpdateInput;
    where: FileWhereUniqueInput;
};
export declare type FileSelectUpdateArgs = {
    select: FileSelect;
    data: FileUpdateInput;
    where: FileWhereUniqueInput;
};
export declare type FileSelectUpdateArgsOptional = {
    select?: FileSelect | null;
    data: FileUpdateInput;
    where: FileWhereUniqueInput;
};
export declare type FileIncludeUpdateArgs = {
    include: FileInclude;
    data: FileUpdateInput;
    where: FileWhereUniqueInput;
};
export declare type FileIncludeUpdateArgsOptional = {
    include?: FileInclude | null;
    data: FileUpdateInput;
    where: FileWhereUniqueInput;
};
export declare type ExtractFileSelectUpdateArgs<S extends undefined | boolean | FileSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FileSelectUpdateArgs ? S['select'] : true;
export declare type ExtractFileIncludeUpdateArgs<S extends undefined | boolean | FileIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FileIncludeUpdateArgs ? S['include'] : true;
/**
 * File updateMany
 */
export declare type FileUpdateManyArgs = {
    data: FileUpdateManyMutationInput;
    where?: FileWhereInput | null;
};
/**
 * File upsert
 */
export declare type FileUpsertArgs = {
    select?: FileSelect | null;
    include?: FileInclude | null;
    where: FileWhereUniqueInput;
    create: FileCreateInput;
    update: FileUpdateInput;
};
export declare type FileUpsertArgsRequired = {
    select: FileSelect;
    include: FileInclude;
    where: FileWhereUniqueInput;
    create: FileCreateInput;
    update: FileUpdateInput;
};
export declare type FileSelectUpsertArgs = {
    select: FileSelect;
    where: FileWhereUniqueInput;
    create: FileCreateInput;
    update: FileUpdateInput;
};
export declare type FileSelectUpsertArgsOptional = {
    select?: FileSelect | null;
    where: FileWhereUniqueInput;
    create: FileCreateInput;
    update: FileUpdateInput;
};
export declare type FileIncludeUpsertArgs = {
    include: FileInclude;
    where: FileWhereUniqueInput;
    create: FileCreateInput;
    update: FileUpdateInput;
};
export declare type FileIncludeUpsertArgsOptional = {
    include?: FileInclude | null;
    where: FileWhereUniqueInput;
    create: FileCreateInput;
    update: FileUpdateInput;
};
export declare type ExtractFileSelectUpsertArgs<S extends undefined | boolean | FileSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FileSelectUpsertArgs ? S['select'] : true;
export declare type ExtractFileIncludeUpsertArgs<S extends undefined | boolean | FileIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FileIncludeUpsertArgs ? S['include'] : true;
/**
 * File delete
 */
export declare type FileDeleteArgs = {
    select?: FileSelect | null;
    include?: FileInclude | null;
    where: FileWhereUniqueInput;
};
export declare type FileDeleteArgsRequired = {
    select: FileSelect;
    include: FileInclude;
    where: FileWhereUniqueInput;
};
export declare type FileSelectDeleteArgs = {
    select: FileSelect;
    where: FileWhereUniqueInput;
};
export declare type FileSelectDeleteArgsOptional = {
    select?: FileSelect | null;
    where: FileWhereUniqueInput;
};
export declare type FileIncludeDeleteArgs = {
    include: FileInclude;
    where: FileWhereUniqueInput;
};
export declare type FileIncludeDeleteArgsOptional = {
    include?: FileInclude | null;
    where: FileWhereUniqueInput;
};
export declare type ExtractFileSelectDeleteArgs<S extends undefined | boolean | FileSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FileSelectDeleteArgs ? S['select'] : true;
export declare type ExtractFileIncludeDeleteArgs<S extends undefined | boolean | FileIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FileIncludeDeleteArgs ? S['include'] : true;
/**
 * File deleteMany
 */
export declare type FileDeleteManyArgs = {
    where?: FileWhereInput | null;
};
/**
 * File without action
 */
export declare type FileArgs = {
    select?: FileSelect | null;
    include?: FileInclude | null;
};
export declare type FileArgsRequired = {
    select: FileSelect;
    include: FileInclude;
};
export declare type FileSelectArgs = {
    select: FileSelect;
};
export declare type FileSelectArgsOptional = {
    select?: FileSelect | null;
};
export declare type FileIncludeArgs = {
    include: FileInclude;
};
export declare type FileIncludeArgsOptional = {
    include?: FileInclude | null;
};
export declare type ExtractFileSelectArgs<S extends undefined | boolean | FileSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FileSelectArgs ? S['select'] : true;
export declare type ExtractFileIncludeArgs<S extends undefined | boolean | FileIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FileIncludeArgs ? S['include'] : true;
/**
 * Deep Input Types
 */
export declare type UserWhereInput = {
    id?: string | StringFilter | null;
    email?: string | StringFilter | null;
    password?: string | StringFilter | null;
    name?: string | NullableStringFilter | null | null;
    posts?: PostFilter | null;
    AND?: Enumerable<UserWhereInput> | null;
    OR?: Enumerable<UserWhereInput> | null;
    NOT?: Enumerable<UserWhereInput> | null;
};
export declare type PostWhereInput = {
    id?: string | StringFilter | null;
    createdAt?: Date | string | DateTimeFilter | null;
    updatedAt?: Date | string | DateTimeFilter | null;
    published?: boolean | BooleanFilter | null;
    title?: string | StringFilter | null;
    content?: string | NullableStringFilter | null | null;
    AND?: Enumerable<PostWhereInput> | null;
    OR?: Enumerable<PostWhereInput> | null;
    NOT?: Enumerable<PostWhereInput> | null;
    author?: UserWhereInput | null;
};
export declare type PostWhereUniqueInput = {
    id?: string | null;
};
export declare type UserWhereUniqueInput = {
    id?: string | null;
    email?: string | null;
};
export declare type FileWhereInput = {
    id?: string | StringFilter | null;
    createdAt?: Date | string | DateTimeFilter | null;
    updatedAt?: Date | string | DateTimeFilter | null;
    filename?: string | StringFilter | null;
    mimetype?: string | StringFilter | null;
    encoding?: string | StringFilter | null;
    path?: string | StringFilter | null;
    AND?: Enumerable<FileWhereInput> | null;
    OR?: Enumerable<FileWhereInput> | null;
    NOT?: Enumerable<FileWhereInput> | null;
};
export declare type FileWhereUniqueInput = {
    id?: string | null;
    path?: string | null;
};
export declare type UserCreateWithoutPostsInput = {
    id?: string | null;
    email: string;
    password: string;
    name?: string | null;
};
export declare type UserCreateOneWithoutAuthorInput = {
    create?: UserCreateWithoutPostsInput | null;
    connect?: UserWhereUniqueInput | null;
};
export declare type PostCreateInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title: string;
    content?: string | null;
    author?: UserCreateOneWithoutAuthorInput | null;
};
export declare type UserUpdateWithoutPostsDataInput = {
    id?: string | null;
    email?: string | null;
    password?: string | null;
    name?: string | null;
};
export declare type UserUpsertWithoutPostsInput = {
    update: UserUpdateWithoutPostsDataInput;
    create: UserCreateWithoutPostsInput;
};
export declare type UserUpdateOneWithoutPostsInput = {
    create?: UserCreateWithoutPostsInput | null;
    connect?: UserWhereUniqueInput | null;
    disconnect?: boolean | null;
    delete?: boolean | null;
    update?: UserUpdateWithoutPostsDataInput | null;
    upsert?: UserUpsertWithoutPostsInput | null;
};
export declare type PostUpdateInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title?: string | null;
    content?: string | null;
    author?: UserUpdateOneWithoutPostsInput | null;
};
export declare type PostUpdateManyMutationInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title?: string | null;
    content?: string | null;
};
export declare type PostCreateWithoutAuthorInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title: string;
    content?: string | null;
};
export declare type PostCreateManyWithoutPostsInput = {
    create?: Enumerable<PostCreateWithoutAuthorInput> | null;
    connect?: Enumerable<PostWhereUniqueInput> | null;
};
export declare type UserCreateInput = {
    id?: string | null;
    email: string;
    password: string;
    name?: string | null;
    posts?: PostCreateManyWithoutPostsInput | null;
};
export declare type PostUpdateWithoutAuthorDataInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title?: string | null;
    content?: string | null;
};
export declare type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput;
    data: PostUpdateWithoutAuthorDataInput;
};
export declare type PostScalarWhereInput = {
    id?: string | StringFilter | null;
    createdAt?: Date | string | DateTimeFilter | null;
    updatedAt?: Date | string | DateTimeFilter | null;
    published?: boolean | BooleanFilter | null;
    title?: string | StringFilter | null;
    content?: string | NullableStringFilter | null | null;
    AND?: Enumerable<PostScalarWhereInput> | null;
    OR?: Enumerable<PostScalarWhereInput> | null;
    NOT?: Enumerable<PostScalarWhereInput> | null;
};
export declare type PostUpdateManyDataInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title?: string | null;
    content?: string | null;
};
export declare type PostUpdateManyWithWhereNestedInput = {
    where: PostScalarWhereInput;
    data: PostUpdateManyDataInput;
};
export declare type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput;
    update: PostUpdateWithoutAuthorDataInput;
    create: PostCreateWithoutAuthorInput;
};
export declare type PostUpdateManyWithoutAuthorInput = {
    create?: Enumerable<PostCreateWithoutAuthorInput> | null;
    connect?: Enumerable<PostWhereUniqueInput> | null;
    set?: Enumerable<PostWhereUniqueInput> | null;
    disconnect?: Enumerable<PostWhereUniqueInput> | null;
    delete?: Enumerable<PostWhereUniqueInput> | null;
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput> | null;
    updateMany?: Enumerable<PostUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<PostScalarWhereInput> | null;
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput> | null;
};
export declare type UserUpdateInput = {
    id?: string | null;
    email?: string | null;
    password?: string | null;
    name?: string | null;
    posts?: PostUpdateManyWithoutAuthorInput | null;
};
export declare type UserUpdateManyMutationInput = {
    id?: string | null;
    email?: string | null;
    password?: string | null;
    name?: string | null;
};
export declare type FileCreateInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    filename: string;
    mimetype: string;
    encoding: string;
    path: string;
};
export declare type FileUpdateInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    filename?: string | null;
    mimetype?: string | null;
    encoding?: string | null;
    path?: string | null;
};
export declare type FileUpdateManyMutationInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    filename?: string | null;
    mimetype?: string | null;
    encoding?: string | null;
    path?: string | null;
};
export declare type StringFilter = {
    equals?: string | null;
    not?: string | StringFilter | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string | null;
    lte?: string | null;
    gt?: string | null;
    gte?: string | null;
    contains?: string | null;
    startsWith?: string | null;
    endsWith?: string | null;
};
export declare type NullableStringFilter = {
    equals?: string | null | null;
    not?: string | null | NullableStringFilter | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string | null;
    lte?: string | null;
    gt?: string | null;
    gte?: string | null;
    contains?: string | null;
    startsWith?: string | null;
    endsWith?: string | null;
};
export declare type PostFilter = {
    every?: PostWhereInput | null;
    some?: PostWhereInput | null;
    none?: PostWhereInput | null;
};
export declare type DateTimeFilter = {
    equals?: Date | string | null;
    not?: Date | string | DateTimeFilter | null;
    in?: Enumerable<Date | string> | null;
    notIn?: Enumerable<Date | string> | null;
    lt?: Date | string | null;
    lte?: Date | string | null;
    gt?: Date | string | null;
    gte?: Date | string | null;
};
export declare type BooleanFilter = {
    equals?: boolean | null;
    not?: boolean | BooleanFilter | null;
};
export declare type PostOrderByInput = {
    id?: OrderByArg | null;
    createdAt?: OrderByArg | null;
    updatedAt?: OrderByArg | null;
    published?: OrderByArg | null;
    title?: OrderByArg | null;
    content?: OrderByArg | null;
};
export declare type UserOrderByInput = {
    id?: OrderByArg | null;
    email?: OrderByArg | null;
    password?: OrderByArg | null;
    name?: OrderByArg | null;
};
export declare type FileOrderByInput = {
    id?: OrderByArg | null;
    createdAt?: OrderByArg | null;
    updatedAt?: OrderByArg | null;
    filename?: OrderByArg | null;
    mimetype?: OrderByArg | null;
    encoding?: OrderByArg | null;
    path?: OrderByArg | null;
};
/**
 * Batch Payload for updateMany & deleteMany
 */
export declare type BatchPayload = {
    count: number;
};
/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
