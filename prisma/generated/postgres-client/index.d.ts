
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectGalleryImage
 * 
 */
export type ProjectGalleryImage = $Result.DefaultSelection<Prisma.$ProjectGalleryImagePayload>
/**
 * Model Certificate
 * 
 */
export type Certificate = $Result.DefaultSelection<Prisma.$CertificatePayload>
/**
 * Model Skill
 * 
 */
export type Skill = $Result.DefaultSelection<Prisma.$SkillPayload>
/**
 * Model Education
 * 
 */
export type Education = $Result.DefaultSelection<Prisma.$EducationPayload>
/**
 * Model Experience
 * 
 */
export type Experience = $Result.DefaultSelection<Prisma.$ExperiencePayload>
/**
 * Model Achievement
 * 
 */
export type Achievement = $Result.DefaultSelection<Prisma.$AchievementPayload>
/**
 * Model PersonalInfo
 * 
 */
export type PersonalInfo = $Result.DefaultSelection<Prisma.$PersonalInfoPayload>
/**
 * Model RetiredId
 * 
 */
export type RetiredId = $Result.DefaultSelection<Prisma.$RetiredIdPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Projects
 * const projects = await prisma.project.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Projects
   * const projects = await prisma.project.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectGalleryImage`: Exposes CRUD operations for the **ProjectGalleryImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectGalleryImages
    * const projectGalleryImages = await prisma.projectGalleryImage.findMany()
    * ```
    */
  get projectGalleryImage(): Prisma.ProjectGalleryImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.certificate`: Exposes CRUD operations for the **Certificate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Certificates
    * const certificates = await prisma.certificate.findMany()
    * ```
    */
  get certificate(): Prisma.CertificateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skill`: Exposes CRUD operations for the **Skill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Skills
    * const skills = await prisma.skill.findMany()
    * ```
    */
  get skill(): Prisma.SkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.education`: Exposes CRUD operations for the **Education** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Educations
    * const educations = await prisma.education.findMany()
    * ```
    */
  get education(): Prisma.EducationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.experience`: Exposes CRUD operations for the **Experience** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Experiences
    * const experiences = await prisma.experience.findMany()
    * ```
    */
  get experience(): Prisma.ExperienceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.achievement`: Exposes CRUD operations for the **Achievement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Achievements
    * const achievements = await prisma.achievement.findMany()
    * ```
    */
  get achievement(): Prisma.AchievementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.personalInfo`: Exposes CRUD operations for the **PersonalInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PersonalInfos
    * const personalInfos = await prisma.personalInfo.findMany()
    * ```
    */
  get personalInfo(): Prisma.PersonalInfoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.retiredId`: Exposes CRUD operations for the **RetiredId** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RetiredIds
    * const retiredIds = await prisma.retiredId.findMany()
    * ```
    */
  get retiredId(): Prisma.RetiredIdDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Project: 'Project',
    ProjectGalleryImage: 'ProjectGalleryImage',
    Certificate: 'Certificate',
    Skill: 'Skill',
    Education: 'Education',
    Experience: 'Experience',
    Achievement: 'Achievement',
    PersonalInfo: 'PersonalInfo',
    RetiredId: 'RetiredId'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "project" | "projectGalleryImage" | "certificate" | "skill" | "education" | "experience" | "achievement" | "personalInfo" | "retiredId"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectGalleryImage: {
        payload: Prisma.$ProjectGalleryImagePayload<ExtArgs>
        fields: Prisma.ProjectGalleryImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectGalleryImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectGalleryImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectGalleryImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectGalleryImagePayload>
          }
          findFirst: {
            args: Prisma.ProjectGalleryImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectGalleryImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectGalleryImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectGalleryImagePayload>
          }
          findMany: {
            args: Prisma.ProjectGalleryImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectGalleryImagePayload>[]
          }
          create: {
            args: Prisma.ProjectGalleryImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectGalleryImagePayload>
          }
          createMany: {
            args: Prisma.ProjectGalleryImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectGalleryImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectGalleryImagePayload>[]
          }
          delete: {
            args: Prisma.ProjectGalleryImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectGalleryImagePayload>
          }
          update: {
            args: Prisma.ProjectGalleryImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectGalleryImagePayload>
          }
          deleteMany: {
            args: Prisma.ProjectGalleryImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectGalleryImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectGalleryImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectGalleryImagePayload>[]
          }
          upsert: {
            args: Prisma.ProjectGalleryImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectGalleryImagePayload>
          }
          aggregate: {
            args: Prisma.ProjectGalleryImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectGalleryImage>
          }
          groupBy: {
            args: Prisma.ProjectGalleryImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGalleryImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectGalleryImageCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectGalleryImageCountAggregateOutputType> | number
          }
        }
      }
      Certificate: {
        payload: Prisma.$CertificatePayload<ExtArgs>
        fields: Prisma.CertificateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CertificateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CertificateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          findFirst: {
            args: Prisma.CertificateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CertificateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          findMany: {
            args: Prisma.CertificateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>[]
          }
          create: {
            args: Prisma.CertificateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          createMany: {
            args: Prisma.CertificateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CertificateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>[]
          }
          delete: {
            args: Prisma.CertificateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          update: {
            args: Prisma.CertificateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          deleteMany: {
            args: Prisma.CertificateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CertificateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CertificateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>[]
          }
          upsert: {
            args: Prisma.CertificateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          aggregate: {
            args: Prisma.CertificateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCertificate>
          }
          groupBy: {
            args: Prisma.CertificateGroupByArgs<ExtArgs>
            result: $Utils.Optional<CertificateGroupByOutputType>[]
          }
          count: {
            args: Prisma.CertificateCountArgs<ExtArgs>
            result: $Utils.Optional<CertificateCountAggregateOutputType> | number
          }
        }
      }
      Skill: {
        payload: Prisma.$SkillPayload<ExtArgs>
        fields: Prisma.SkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          findFirst: {
            args: Prisma.SkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          findMany: {
            args: Prisma.SkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[]
          }
          create: {
            args: Prisma.SkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          createMany: {
            args: Prisma.SkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SkillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[]
          }
          delete: {
            args: Prisma.SkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          update: {
            args: Prisma.SkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          deleteMany: {
            args: Prisma.SkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SkillUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[]
          }
          upsert: {
            args: Prisma.SkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          aggregate: {
            args: Prisma.SkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkill>
          }
          groupBy: {
            args: Prisma.SkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.SkillCountArgs<ExtArgs>
            result: $Utils.Optional<SkillCountAggregateOutputType> | number
          }
        }
      }
      Education: {
        payload: Prisma.$EducationPayload<ExtArgs>
        fields: Prisma.EducationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EducationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EducationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          findFirst: {
            args: Prisma.EducationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EducationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          findMany: {
            args: Prisma.EducationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[]
          }
          create: {
            args: Prisma.EducationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          createMany: {
            args: Prisma.EducationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EducationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[]
          }
          delete: {
            args: Prisma.EducationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          update: {
            args: Prisma.EducationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          deleteMany: {
            args: Prisma.EducationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EducationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EducationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[]
          }
          upsert: {
            args: Prisma.EducationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          aggregate: {
            args: Prisma.EducationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEducation>
          }
          groupBy: {
            args: Prisma.EducationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EducationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EducationCountArgs<ExtArgs>
            result: $Utils.Optional<EducationCountAggregateOutputType> | number
          }
        }
      }
      Experience: {
        payload: Prisma.$ExperiencePayload<ExtArgs>
        fields: Prisma.ExperienceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExperienceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExperienceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          findFirst: {
            args: Prisma.ExperienceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExperienceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          findMany: {
            args: Prisma.ExperienceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[]
          }
          create: {
            args: Prisma.ExperienceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          createMany: {
            args: Prisma.ExperienceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExperienceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[]
          }
          delete: {
            args: Prisma.ExperienceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          update: {
            args: Prisma.ExperienceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          deleteMany: {
            args: Prisma.ExperienceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExperienceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExperienceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[]
          }
          upsert: {
            args: Prisma.ExperienceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          aggregate: {
            args: Prisma.ExperienceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExperience>
          }
          groupBy: {
            args: Prisma.ExperienceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExperienceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExperienceCountArgs<ExtArgs>
            result: $Utils.Optional<ExperienceCountAggregateOutputType> | number
          }
        }
      }
      Achievement: {
        payload: Prisma.$AchievementPayload<ExtArgs>
        fields: Prisma.AchievementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AchievementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AchievementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findFirst: {
            args: Prisma.AchievementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AchievementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findMany: {
            args: Prisma.AchievementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          create: {
            args: Prisma.AchievementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          createMany: {
            args: Prisma.AchievementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AchievementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          delete: {
            args: Prisma.AchievementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          update: {
            args: Prisma.AchievementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          deleteMany: {
            args: Prisma.AchievementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AchievementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AchievementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          upsert: {
            args: Prisma.AchievementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          aggregate: {
            args: Prisma.AchievementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAchievement>
          }
          groupBy: {
            args: Prisma.AchievementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AchievementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AchievementCountArgs<ExtArgs>
            result: $Utils.Optional<AchievementCountAggregateOutputType> | number
          }
        }
      }
      PersonalInfo: {
        payload: Prisma.$PersonalInfoPayload<ExtArgs>
        fields: Prisma.PersonalInfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonalInfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalInfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonalInfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalInfoPayload>
          }
          findFirst: {
            args: Prisma.PersonalInfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalInfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonalInfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalInfoPayload>
          }
          findMany: {
            args: Prisma.PersonalInfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalInfoPayload>[]
          }
          create: {
            args: Prisma.PersonalInfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalInfoPayload>
          }
          createMany: {
            args: Prisma.PersonalInfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonalInfoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalInfoPayload>[]
          }
          delete: {
            args: Prisma.PersonalInfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalInfoPayload>
          }
          update: {
            args: Prisma.PersonalInfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalInfoPayload>
          }
          deleteMany: {
            args: Prisma.PersonalInfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonalInfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonalInfoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalInfoPayload>[]
          }
          upsert: {
            args: Prisma.PersonalInfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalInfoPayload>
          }
          aggregate: {
            args: Prisma.PersonalInfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePersonalInfo>
          }
          groupBy: {
            args: Prisma.PersonalInfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonalInfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonalInfoCountArgs<ExtArgs>
            result: $Utils.Optional<PersonalInfoCountAggregateOutputType> | number
          }
        }
      }
      RetiredId: {
        payload: Prisma.$RetiredIdPayload<ExtArgs>
        fields: Prisma.RetiredIdFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RetiredIdFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiredIdPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RetiredIdFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiredIdPayload>
          }
          findFirst: {
            args: Prisma.RetiredIdFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiredIdPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RetiredIdFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiredIdPayload>
          }
          findMany: {
            args: Prisma.RetiredIdFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiredIdPayload>[]
          }
          create: {
            args: Prisma.RetiredIdCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiredIdPayload>
          }
          createMany: {
            args: Prisma.RetiredIdCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RetiredIdCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiredIdPayload>[]
          }
          delete: {
            args: Prisma.RetiredIdDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiredIdPayload>
          }
          update: {
            args: Prisma.RetiredIdUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiredIdPayload>
          }
          deleteMany: {
            args: Prisma.RetiredIdDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RetiredIdUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RetiredIdUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiredIdPayload>[]
          }
          upsert: {
            args: Prisma.RetiredIdUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiredIdPayload>
          }
          aggregate: {
            args: Prisma.RetiredIdAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRetiredId>
          }
          groupBy: {
            args: Prisma.RetiredIdGroupByArgs<ExtArgs>
            result: $Utils.Optional<RetiredIdGroupByOutputType>[]
          }
          count: {
            args: Prisma.RetiredIdCountArgs<ExtArgs>
            result: $Utils.Optional<RetiredIdCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    project?: ProjectOmit
    projectGalleryImage?: ProjectGalleryImageOmit
    certificate?: CertificateOmit
    skill?: SkillOmit
    education?: EducationOmit
    experience?: ExperienceOmit
    achievement?: AchievementOmit
    personalInfo?: PersonalInfoOmit
    retiredId?: RetiredIdOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    galleryImages: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    galleryImages?: boolean | ProjectCountOutputTypeCountGalleryImagesArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountGalleryImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectGalleryImageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type ProjectSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    slug: string | null
    number: string | null
    displayOrder: number | null
    isPublished: boolean | null
    title: string | null
    category: string | null
    categories: string | null
    domain: string | null
    organization: string | null
    shortDescription: string | null
    fullDescription: string | null
    technologies: string | null
    features: string | null
    mainImage: string | null
    liveUrl: string | null
    githubUrl: string | null
    year: string | null
    status: string | null
    featured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    number: string | null
    displayOrder: number | null
    isPublished: boolean | null
    title: string | null
    category: string | null
    categories: string | null
    domain: string | null
    organization: string | null
    shortDescription: string | null
    fullDescription: string | null
    technologies: string | null
    features: string | null
    mainImage: string | null
    liveUrl: string | null
    githubUrl: string | null
    year: string | null
    status: string | null
    featured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    slug: number
    number: number
    displayOrder: number
    isPublished: number
    title: number
    category: number
    categories: number
    domain: number
    organization: number
    shortDescription: number
    fullDescription: number
    technologies: number
    features: number
    mainImage: number
    liveUrl: number
    githubUrl: number
    year: number
    status: number
    featured: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    displayOrder?: true
  }

  export type ProjectSumAggregateInputType = {
    displayOrder?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    slug?: true
    number?: true
    displayOrder?: true
    isPublished?: true
    title?: true
    category?: true
    categories?: true
    domain?: true
    organization?: true
    shortDescription?: true
    fullDescription?: true
    technologies?: true
    features?: true
    mainImage?: true
    liveUrl?: true
    githubUrl?: true
    year?: true
    status?: true
    featured?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    slug?: true
    number?: true
    displayOrder?: true
    isPublished?: true
    title?: true
    category?: true
    categories?: true
    domain?: true
    organization?: true
    shortDescription?: true
    fullDescription?: true
    technologies?: true
    features?: true
    mainImage?: true
    liveUrl?: true
    githubUrl?: true
    year?: true
    status?: true
    featured?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    slug?: true
    number?: true
    displayOrder?: true
    isPublished?: true
    title?: true
    category?: true
    categories?: true
    domain?: true
    organization?: true
    shortDescription?: true
    fullDescription?: true
    technologies?: true
    features?: true
    mainImage?: true
    liveUrl?: true
    githubUrl?: true
    year?: true
    status?: true
    featured?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    slug: string
    number: string
    displayOrder: number
    isPublished: boolean
    title: string
    category: string
    categories: string
    domain: string
    organization: string | null
    shortDescription: string
    fullDescription: string
    technologies: string
    features: string
    mainImage: string
    liveUrl: string | null
    githubUrl: string | null
    year: string
    status: string
    featured: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    number?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    title?: boolean
    category?: boolean
    categories?: boolean
    domain?: boolean
    organization?: boolean
    shortDescription?: boolean
    fullDescription?: boolean
    technologies?: boolean
    features?: boolean
    mainImage?: boolean
    liveUrl?: boolean
    githubUrl?: boolean
    year?: boolean
    status?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    galleryImages?: boolean | Project$galleryImagesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    number?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    title?: boolean
    category?: boolean
    categories?: boolean
    domain?: boolean
    organization?: boolean
    shortDescription?: boolean
    fullDescription?: boolean
    technologies?: boolean
    features?: boolean
    mainImage?: boolean
    liveUrl?: boolean
    githubUrl?: boolean
    year?: boolean
    status?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    number?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    title?: boolean
    category?: boolean
    categories?: boolean
    domain?: boolean
    organization?: boolean
    shortDescription?: boolean
    fullDescription?: boolean
    technologies?: boolean
    features?: boolean
    mainImage?: boolean
    liveUrl?: boolean
    githubUrl?: boolean
    year?: boolean
    status?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    slug?: boolean
    number?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    title?: boolean
    category?: boolean
    categories?: boolean
    domain?: boolean
    organization?: boolean
    shortDescription?: boolean
    fullDescription?: boolean
    technologies?: boolean
    features?: boolean
    mainImage?: boolean
    liveUrl?: boolean
    githubUrl?: boolean
    year?: boolean
    status?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "number" | "displayOrder" | "isPublished" | "title" | "category" | "categories" | "domain" | "organization" | "shortDescription" | "fullDescription" | "technologies" | "features" | "mainImage" | "liveUrl" | "githubUrl" | "year" | "status" | "featured" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    galleryImages?: boolean | Project$galleryImagesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      galleryImages: Prisma.$ProjectGalleryImagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      number: string
      displayOrder: number
      isPublished: boolean
      title: string
      category: string
      categories: string
      domain: string
      organization: string | null
      shortDescription: string
      fullDescription: string
      technologies: string
      features: string
      mainImage: string
      liveUrl: string | null
      githubUrl: string | null
      year: string
      status: string
      featured: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    galleryImages<T extends Project$galleryImagesArgs<ExtArgs> = {}>(args?: Subset<T, Project$galleryImagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectGalleryImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly slug: FieldRef<"Project", 'String'>
    readonly number: FieldRef<"Project", 'String'>
    readonly displayOrder: FieldRef<"Project", 'Int'>
    readonly isPublished: FieldRef<"Project", 'Boolean'>
    readonly title: FieldRef<"Project", 'String'>
    readonly category: FieldRef<"Project", 'String'>
    readonly categories: FieldRef<"Project", 'String'>
    readonly domain: FieldRef<"Project", 'String'>
    readonly organization: FieldRef<"Project", 'String'>
    readonly shortDescription: FieldRef<"Project", 'String'>
    readonly fullDescription: FieldRef<"Project", 'String'>
    readonly technologies: FieldRef<"Project", 'String'>
    readonly features: FieldRef<"Project", 'String'>
    readonly mainImage: FieldRef<"Project", 'String'>
    readonly liveUrl: FieldRef<"Project", 'String'>
    readonly githubUrl: FieldRef<"Project", 'String'>
    readonly year: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'String'>
    readonly featured: FieldRef<"Project", 'Boolean'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.galleryImages
   */
  export type Project$galleryImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectGalleryImage
     */
    select?: ProjectGalleryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectGalleryImage
     */
    omit?: ProjectGalleryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectGalleryImageInclude<ExtArgs> | null
    where?: ProjectGalleryImageWhereInput
    orderBy?: ProjectGalleryImageOrderByWithRelationInput | ProjectGalleryImageOrderByWithRelationInput[]
    cursor?: ProjectGalleryImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectGalleryImageScalarFieldEnum | ProjectGalleryImageScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectGalleryImage
   */

  export type AggregateProjectGalleryImage = {
    _count: ProjectGalleryImageCountAggregateOutputType | null
    _avg: ProjectGalleryImageAvgAggregateOutputType | null
    _sum: ProjectGalleryImageSumAggregateOutputType | null
    _min: ProjectGalleryImageMinAggregateOutputType | null
    _max: ProjectGalleryImageMaxAggregateOutputType | null
  }

  export type ProjectGalleryImageAvgAggregateOutputType = {
    order: number | null
  }

  export type ProjectGalleryImageSumAggregateOutputType = {
    order: number | null
  }

  export type ProjectGalleryImageMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    imageUrl: string | null
    order: number | null
  }

  export type ProjectGalleryImageMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    imageUrl: string | null
    order: number | null
  }

  export type ProjectGalleryImageCountAggregateOutputType = {
    id: number
    projectId: number
    imageUrl: number
    order: number
    _all: number
  }


  export type ProjectGalleryImageAvgAggregateInputType = {
    order?: true
  }

  export type ProjectGalleryImageSumAggregateInputType = {
    order?: true
  }

  export type ProjectGalleryImageMinAggregateInputType = {
    id?: true
    projectId?: true
    imageUrl?: true
    order?: true
  }

  export type ProjectGalleryImageMaxAggregateInputType = {
    id?: true
    projectId?: true
    imageUrl?: true
    order?: true
  }

  export type ProjectGalleryImageCountAggregateInputType = {
    id?: true
    projectId?: true
    imageUrl?: true
    order?: true
    _all?: true
  }

  export type ProjectGalleryImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectGalleryImage to aggregate.
     */
    where?: ProjectGalleryImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectGalleryImages to fetch.
     */
    orderBy?: ProjectGalleryImageOrderByWithRelationInput | ProjectGalleryImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectGalleryImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectGalleryImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectGalleryImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectGalleryImages
    **/
    _count?: true | ProjectGalleryImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectGalleryImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectGalleryImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectGalleryImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectGalleryImageMaxAggregateInputType
  }

  export type GetProjectGalleryImageAggregateType<T extends ProjectGalleryImageAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectGalleryImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectGalleryImage[P]>
      : GetScalarType<T[P], AggregateProjectGalleryImage[P]>
  }




  export type ProjectGalleryImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectGalleryImageWhereInput
    orderBy?: ProjectGalleryImageOrderByWithAggregationInput | ProjectGalleryImageOrderByWithAggregationInput[]
    by: ProjectGalleryImageScalarFieldEnum[] | ProjectGalleryImageScalarFieldEnum
    having?: ProjectGalleryImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectGalleryImageCountAggregateInputType | true
    _avg?: ProjectGalleryImageAvgAggregateInputType
    _sum?: ProjectGalleryImageSumAggregateInputType
    _min?: ProjectGalleryImageMinAggregateInputType
    _max?: ProjectGalleryImageMaxAggregateInputType
  }

  export type ProjectGalleryImageGroupByOutputType = {
    id: string
    projectId: string
    imageUrl: string
    order: number
    _count: ProjectGalleryImageCountAggregateOutputType | null
    _avg: ProjectGalleryImageAvgAggregateOutputType | null
    _sum: ProjectGalleryImageSumAggregateOutputType | null
    _min: ProjectGalleryImageMinAggregateOutputType | null
    _max: ProjectGalleryImageMaxAggregateOutputType | null
  }

  type GetProjectGalleryImageGroupByPayload<T extends ProjectGalleryImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGalleryImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGalleryImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGalleryImageGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGalleryImageGroupByOutputType[P]>
        }
      >
    >


  export type ProjectGalleryImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    imageUrl?: boolean
    order?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectGalleryImage"]>

  export type ProjectGalleryImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    imageUrl?: boolean
    order?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectGalleryImage"]>

  export type ProjectGalleryImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    imageUrl?: boolean
    order?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectGalleryImage"]>

  export type ProjectGalleryImageSelectScalar = {
    id?: boolean
    projectId?: boolean
    imageUrl?: boolean
    order?: boolean
  }

  export type ProjectGalleryImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "imageUrl" | "order", ExtArgs["result"]["projectGalleryImage"]>
  export type ProjectGalleryImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectGalleryImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectGalleryImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectGalleryImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectGalleryImage"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      imageUrl: string
      order: number
    }, ExtArgs["result"]["projectGalleryImage"]>
    composites: {}
  }

  type ProjectGalleryImageGetPayload<S extends boolean | null | undefined | ProjectGalleryImageDefaultArgs> = $Result.GetResult<Prisma.$ProjectGalleryImagePayload, S>

  type ProjectGalleryImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectGalleryImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectGalleryImageCountAggregateInputType | true
    }

  export interface ProjectGalleryImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectGalleryImage'], meta: { name: 'ProjectGalleryImage' } }
    /**
     * Find zero or one ProjectGalleryImage that matches the filter.
     * @param {ProjectGalleryImageFindUniqueArgs} args - Arguments to find a ProjectGalleryImage
     * @example
     * // Get one ProjectGalleryImage
     * const projectGalleryImage = await prisma.projectGalleryImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectGalleryImageFindUniqueArgs>(args: SelectSubset<T, ProjectGalleryImageFindUniqueArgs<ExtArgs>>): Prisma__ProjectGalleryImageClient<$Result.GetResult<Prisma.$ProjectGalleryImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectGalleryImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectGalleryImageFindUniqueOrThrowArgs} args - Arguments to find a ProjectGalleryImage
     * @example
     * // Get one ProjectGalleryImage
     * const projectGalleryImage = await prisma.projectGalleryImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectGalleryImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectGalleryImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectGalleryImageClient<$Result.GetResult<Prisma.$ProjectGalleryImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectGalleryImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGalleryImageFindFirstArgs} args - Arguments to find a ProjectGalleryImage
     * @example
     * // Get one ProjectGalleryImage
     * const projectGalleryImage = await prisma.projectGalleryImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectGalleryImageFindFirstArgs>(args?: SelectSubset<T, ProjectGalleryImageFindFirstArgs<ExtArgs>>): Prisma__ProjectGalleryImageClient<$Result.GetResult<Prisma.$ProjectGalleryImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectGalleryImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGalleryImageFindFirstOrThrowArgs} args - Arguments to find a ProjectGalleryImage
     * @example
     * // Get one ProjectGalleryImage
     * const projectGalleryImage = await prisma.projectGalleryImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectGalleryImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectGalleryImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectGalleryImageClient<$Result.GetResult<Prisma.$ProjectGalleryImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectGalleryImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGalleryImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectGalleryImages
     * const projectGalleryImages = await prisma.projectGalleryImage.findMany()
     * 
     * // Get first 10 ProjectGalleryImages
     * const projectGalleryImages = await prisma.projectGalleryImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectGalleryImageWithIdOnly = await prisma.projectGalleryImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectGalleryImageFindManyArgs>(args?: SelectSubset<T, ProjectGalleryImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectGalleryImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectGalleryImage.
     * @param {ProjectGalleryImageCreateArgs} args - Arguments to create a ProjectGalleryImage.
     * @example
     * // Create one ProjectGalleryImage
     * const ProjectGalleryImage = await prisma.projectGalleryImage.create({
     *   data: {
     *     // ... data to create a ProjectGalleryImage
     *   }
     * })
     * 
     */
    create<T extends ProjectGalleryImageCreateArgs>(args: SelectSubset<T, ProjectGalleryImageCreateArgs<ExtArgs>>): Prisma__ProjectGalleryImageClient<$Result.GetResult<Prisma.$ProjectGalleryImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectGalleryImages.
     * @param {ProjectGalleryImageCreateManyArgs} args - Arguments to create many ProjectGalleryImages.
     * @example
     * // Create many ProjectGalleryImages
     * const projectGalleryImage = await prisma.projectGalleryImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectGalleryImageCreateManyArgs>(args?: SelectSubset<T, ProjectGalleryImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectGalleryImages and returns the data saved in the database.
     * @param {ProjectGalleryImageCreateManyAndReturnArgs} args - Arguments to create many ProjectGalleryImages.
     * @example
     * // Create many ProjectGalleryImages
     * const projectGalleryImage = await prisma.projectGalleryImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectGalleryImages and only return the `id`
     * const projectGalleryImageWithIdOnly = await prisma.projectGalleryImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectGalleryImageCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectGalleryImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectGalleryImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectGalleryImage.
     * @param {ProjectGalleryImageDeleteArgs} args - Arguments to delete one ProjectGalleryImage.
     * @example
     * // Delete one ProjectGalleryImage
     * const ProjectGalleryImage = await prisma.projectGalleryImage.delete({
     *   where: {
     *     // ... filter to delete one ProjectGalleryImage
     *   }
     * })
     * 
     */
    delete<T extends ProjectGalleryImageDeleteArgs>(args: SelectSubset<T, ProjectGalleryImageDeleteArgs<ExtArgs>>): Prisma__ProjectGalleryImageClient<$Result.GetResult<Prisma.$ProjectGalleryImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectGalleryImage.
     * @param {ProjectGalleryImageUpdateArgs} args - Arguments to update one ProjectGalleryImage.
     * @example
     * // Update one ProjectGalleryImage
     * const projectGalleryImage = await prisma.projectGalleryImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectGalleryImageUpdateArgs>(args: SelectSubset<T, ProjectGalleryImageUpdateArgs<ExtArgs>>): Prisma__ProjectGalleryImageClient<$Result.GetResult<Prisma.$ProjectGalleryImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectGalleryImages.
     * @param {ProjectGalleryImageDeleteManyArgs} args - Arguments to filter ProjectGalleryImages to delete.
     * @example
     * // Delete a few ProjectGalleryImages
     * const { count } = await prisma.projectGalleryImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectGalleryImageDeleteManyArgs>(args?: SelectSubset<T, ProjectGalleryImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectGalleryImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGalleryImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectGalleryImages
     * const projectGalleryImage = await prisma.projectGalleryImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectGalleryImageUpdateManyArgs>(args: SelectSubset<T, ProjectGalleryImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectGalleryImages and returns the data updated in the database.
     * @param {ProjectGalleryImageUpdateManyAndReturnArgs} args - Arguments to update many ProjectGalleryImages.
     * @example
     * // Update many ProjectGalleryImages
     * const projectGalleryImage = await prisma.projectGalleryImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectGalleryImages and only return the `id`
     * const projectGalleryImageWithIdOnly = await prisma.projectGalleryImage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectGalleryImageUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectGalleryImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectGalleryImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectGalleryImage.
     * @param {ProjectGalleryImageUpsertArgs} args - Arguments to update or create a ProjectGalleryImage.
     * @example
     * // Update or create a ProjectGalleryImage
     * const projectGalleryImage = await prisma.projectGalleryImage.upsert({
     *   create: {
     *     // ... data to create a ProjectGalleryImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectGalleryImage we want to update
     *   }
     * })
     */
    upsert<T extends ProjectGalleryImageUpsertArgs>(args: SelectSubset<T, ProjectGalleryImageUpsertArgs<ExtArgs>>): Prisma__ProjectGalleryImageClient<$Result.GetResult<Prisma.$ProjectGalleryImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectGalleryImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGalleryImageCountArgs} args - Arguments to filter ProjectGalleryImages to count.
     * @example
     * // Count the number of ProjectGalleryImages
     * const count = await prisma.projectGalleryImage.count({
     *   where: {
     *     // ... the filter for the ProjectGalleryImages we want to count
     *   }
     * })
    **/
    count<T extends ProjectGalleryImageCountArgs>(
      args?: Subset<T, ProjectGalleryImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectGalleryImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectGalleryImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGalleryImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectGalleryImageAggregateArgs>(args: Subset<T, ProjectGalleryImageAggregateArgs>): Prisma.PrismaPromise<GetProjectGalleryImageAggregateType<T>>

    /**
     * Group by ProjectGalleryImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGalleryImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGalleryImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGalleryImageGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGalleryImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGalleryImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGalleryImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectGalleryImage model
   */
  readonly fields: ProjectGalleryImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectGalleryImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectGalleryImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectGalleryImage model
   */
  interface ProjectGalleryImageFieldRefs {
    readonly id: FieldRef<"ProjectGalleryImage", 'String'>
    readonly projectId: FieldRef<"ProjectGalleryImage", 'String'>
    readonly imageUrl: FieldRef<"ProjectGalleryImage", 'String'>
    readonly order: FieldRef<"ProjectGalleryImage", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProjectGalleryImage findUnique
   */
  export type ProjectGalleryImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectGalleryImage
     */
    select?: ProjectGalleryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectGalleryImage
     */
    omit?: ProjectGalleryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectGalleryImageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectGalleryImage to fetch.
     */
    where: ProjectGalleryImageWhereUniqueInput
  }

  /**
   * ProjectGalleryImage findUniqueOrThrow
   */
  export type ProjectGalleryImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectGalleryImage
     */
    select?: ProjectGalleryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectGalleryImage
     */
    omit?: ProjectGalleryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectGalleryImageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectGalleryImage to fetch.
     */
    where: ProjectGalleryImageWhereUniqueInput
  }

  /**
   * ProjectGalleryImage findFirst
   */
  export type ProjectGalleryImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectGalleryImage
     */
    select?: ProjectGalleryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectGalleryImage
     */
    omit?: ProjectGalleryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectGalleryImageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectGalleryImage to fetch.
     */
    where?: ProjectGalleryImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectGalleryImages to fetch.
     */
    orderBy?: ProjectGalleryImageOrderByWithRelationInput | ProjectGalleryImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectGalleryImages.
     */
    cursor?: ProjectGalleryImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectGalleryImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectGalleryImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectGalleryImages.
     */
    distinct?: ProjectGalleryImageScalarFieldEnum | ProjectGalleryImageScalarFieldEnum[]
  }

  /**
   * ProjectGalleryImage findFirstOrThrow
   */
  export type ProjectGalleryImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectGalleryImage
     */
    select?: ProjectGalleryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectGalleryImage
     */
    omit?: ProjectGalleryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectGalleryImageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectGalleryImage to fetch.
     */
    where?: ProjectGalleryImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectGalleryImages to fetch.
     */
    orderBy?: ProjectGalleryImageOrderByWithRelationInput | ProjectGalleryImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectGalleryImages.
     */
    cursor?: ProjectGalleryImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectGalleryImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectGalleryImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectGalleryImages.
     */
    distinct?: ProjectGalleryImageScalarFieldEnum | ProjectGalleryImageScalarFieldEnum[]
  }

  /**
   * ProjectGalleryImage findMany
   */
  export type ProjectGalleryImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectGalleryImage
     */
    select?: ProjectGalleryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectGalleryImage
     */
    omit?: ProjectGalleryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectGalleryImageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectGalleryImages to fetch.
     */
    where?: ProjectGalleryImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectGalleryImages to fetch.
     */
    orderBy?: ProjectGalleryImageOrderByWithRelationInput | ProjectGalleryImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectGalleryImages.
     */
    cursor?: ProjectGalleryImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectGalleryImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectGalleryImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectGalleryImages.
     */
    distinct?: ProjectGalleryImageScalarFieldEnum | ProjectGalleryImageScalarFieldEnum[]
  }

  /**
   * ProjectGalleryImage create
   */
  export type ProjectGalleryImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectGalleryImage
     */
    select?: ProjectGalleryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectGalleryImage
     */
    omit?: ProjectGalleryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectGalleryImageInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectGalleryImage.
     */
    data: XOR<ProjectGalleryImageCreateInput, ProjectGalleryImageUncheckedCreateInput>
  }

  /**
   * ProjectGalleryImage createMany
   */
  export type ProjectGalleryImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectGalleryImages.
     */
    data: ProjectGalleryImageCreateManyInput | ProjectGalleryImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectGalleryImage createManyAndReturn
   */
  export type ProjectGalleryImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectGalleryImage
     */
    select?: ProjectGalleryImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectGalleryImage
     */
    omit?: ProjectGalleryImageOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectGalleryImages.
     */
    data: ProjectGalleryImageCreateManyInput | ProjectGalleryImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectGalleryImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectGalleryImage update
   */
  export type ProjectGalleryImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectGalleryImage
     */
    select?: ProjectGalleryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectGalleryImage
     */
    omit?: ProjectGalleryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectGalleryImageInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectGalleryImage.
     */
    data: XOR<ProjectGalleryImageUpdateInput, ProjectGalleryImageUncheckedUpdateInput>
    /**
     * Choose, which ProjectGalleryImage to update.
     */
    where: ProjectGalleryImageWhereUniqueInput
  }

  /**
   * ProjectGalleryImage updateMany
   */
  export type ProjectGalleryImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectGalleryImages.
     */
    data: XOR<ProjectGalleryImageUpdateManyMutationInput, ProjectGalleryImageUncheckedUpdateManyInput>
    /**
     * Filter which ProjectGalleryImages to update
     */
    where?: ProjectGalleryImageWhereInput
    /**
     * Limit how many ProjectGalleryImages to update.
     */
    limit?: number
  }

  /**
   * ProjectGalleryImage updateManyAndReturn
   */
  export type ProjectGalleryImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectGalleryImage
     */
    select?: ProjectGalleryImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectGalleryImage
     */
    omit?: ProjectGalleryImageOmit<ExtArgs> | null
    /**
     * The data used to update ProjectGalleryImages.
     */
    data: XOR<ProjectGalleryImageUpdateManyMutationInput, ProjectGalleryImageUncheckedUpdateManyInput>
    /**
     * Filter which ProjectGalleryImages to update
     */
    where?: ProjectGalleryImageWhereInput
    /**
     * Limit how many ProjectGalleryImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectGalleryImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectGalleryImage upsert
   */
  export type ProjectGalleryImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectGalleryImage
     */
    select?: ProjectGalleryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectGalleryImage
     */
    omit?: ProjectGalleryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectGalleryImageInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectGalleryImage to update in case it exists.
     */
    where: ProjectGalleryImageWhereUniqueInput
    /**
     * In case the ProjectGalleryImage found by the `where` argument doesn't exist, create a new ProjectGalleryImage with this data.
     */
    create: XOR<ProjectGalleryImageCreateInput, ProjectGalleryImageUncheckedCreateInput>
    /**
     * In case the ProjectGalleryImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectGalleryImageUpdateInput, ProjectGalleryImageUncheckedUpdateInput>
  }

  /**
   * ProjectGalleryImage delete
   */
  export type ProjectGalleryImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectGalleryImage
     */
    select?: ProjectGalleryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectGalleryImage
     */
    omit?: ProjectGalleryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectGalleryImageInclude<ExtArgs> | null
    /**
     * Filter which ProjectGalleryImage to delete.
     */
    where: ProjectGalleryImageWhereUniqueInput
  }

  /**
   * ProjectGalleryImage deleteMany
   */
  export type ProjectGalleryImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectGalleryImages to delete
     */
    where?: ProjectGalleryImageWhereInput
    /**
     * Limit how many ProjectGalleryImages to delete.
     */
    limit?: number
  }

  /**
   * ProjectGalleryImage without action
   */
  export type ProjectGalleryImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectGalleryImage
     */
    select?: ProjectGalleryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectGalleryImage
     */
    omit?: ProjectGalleryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectGalleryImageInclude<ExtArgs> | null
  }


  /**
   * Model Certificate
   */

  export type AggregateCertificate = {
    _count: CertificateCountAggregateOutputType | null
    _avg: CertificateAvgAggregateOutputType | null
    _sum: CertificateSumAggregateOutputType | null
    _min: CertificateMinAggregateOutputType | null
    _max: CertificateMaxAggregateOutputType | null
  }

  export type CertificateAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type CertificateSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type CertificateMinAggregateOutputType = {
    id: string | null
    number: string | null
    displayOrder: number | null
    isPublished: boolean | null
    title: string | null
    issuer: string | null
    category: string | null
    date: string | null
    score: string | null
    certificationTier: string | null
    credentialId: string | null
    duration: string | null
    description: string | null
    skills: string | null
    image: string | null
    verificationUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CertificateMaxAggregateOutputType = {
    id: string | null
    number: string | null
    displayOrder: number | null
    isPublished: boolean | null
    title: string | null
    issuer: string | null
    category: string | null
    date: string | null
    score: string | null
    certificationTier: string | null
    credentialId: string | null
    duration: string | null
    description: string | null
    skills: string | null
    image: string | null
    verificationUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CertificateCountAggregateOutputType = {
    id: number
    number: number
    displayOrder: number
    isPublished: number
    title: number
    issuer: number
    category: number
    date: number
    score: number
    certificationTier: number
    credentialId: number
    duration: number
    description: number
    skills: number
    image: number
    verificationUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CertificateAvgAggregateInputType = {
    displayOrder?: true
  }

  export type CertificateSumAggregateInputType = {
    displayOrder?: true
  }

  export type CertificateMinAggregateInputType = {
    id?: true
    number?: true
    displayOrder?: true
    isPublished?: true
    title?: true
    issuer?: true
    category?: true
    date?: true
    score?: true
    certificationTier?: true
    credentialId?: true
    duration?: true
    description?: true
    skills?: true
    image?: true
    verificationUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CertificateMaxAggregateInputType = {
    id?: true
    number?: true
    displayOrder?: true
    isPublished?: true
    title?: true
    issuer?: true
    category?: true
    date?: true
    score?: true
    certificationTier?: true
    credentialId?: true
    duration?: true
    description?: true
    skills?: true
    image?: true
    verificationUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CertificateCountAggregateInputType = {
    id?: true
    number?: true
    displayOrder?: true
    isPublished?: true
    title?: true
    issuer?: true
    category?: true
    date?: true
    score?: true
    certificationTier?: true
    credentialId?: true
    duration?: true
    description?: true
    skills?: true
    image?: true
    verificationUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CertificateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Certificate to aggregate.
     */
    where?: CertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificates to fetch.
     */
    orderBy?: CertificateOrderByWithRelationInput | CertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Certificates
    **/
    _count?: true | CertificateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CertificateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CertificateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CertificateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CertificateMaxAggregateInputType
  }

  export type GetCertificateAggregateType<T extends CertificateAggregateArgs> = {
        [P in keyof T & keyof AggregateCertificate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCertificate[P]>
      : GetScalarType<T[P], AggregateCertificate[P]>
  }




  export type CertificateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificateWhereInput
    orderBy?: CertificateOrderByWithAggregationInput | CertificateOrderByWithAggregationInput[]
    by: CertificateScalarFieldEnum[] | CertificateScalarFieldEnum
    having?: CertificateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CertificateCountAggregateInputType | true
    _avg?: CertificateAvgAggregateInputType
    _sum?: CertificateSumAggregateInputType
    _min?: CertificateMinAggregateInputType
    _max?: CertificateMaxAggregateInputType
  }

  export type CertificateGroupByOutputType = {
    id: string
    number: string
    displayOrder: number
    isPublished: boolean
    title: string
    issuer: string
    category: string
    date: string
    score: string | null
    certificationTier: string | null
    credentialId: string | null
    duration: string | null
    description: string
    skills: string
    image: string
    verificationUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: CertificateCountAggregateOutputType | null
    _avg: CertificateAvgAggregateOutputType | null
    _sum: CertificateSumAggregateOutputType | null
    _min: CertificateMinAggregateOutputType | null
    _max: CertificateMaxAggregateOutputType | null
  }

  type GetCertificateGroupByPayload<T extends CertificateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CertificateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CertificateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CertificateGroupByOutputType[P]>
            : GetScalarType<T[P], CertificateGroupByOutputType[P]>
        }
      >
    >


  export type CertificateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    title?: boolean
    issuer?: boolean
    category?: boolean
    date?: boolean
    score?: boolean
    certificationTier?: boolean
    credentialId?: boolean
    duration?: boolean
    description?: boolean
    skills?: boolean
    image?: boolean
    verificationUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["certificate"]>

  export type CertificateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    title?: boolean
    issuer?: boolean
    category?: boolean
    date?: boolean
    score?: boolean
    certificationTier?: boolean
    credentialId?: boolean
    duration?: boolean
    description?: boolean
    skills?: boolean
    image?: boolean
    verificationUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["certificate"]>

  export type CertificateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    title?: boolean
    issuer?: boolean
    category?: boolean
    date?: boolean
    score?: boolean
    certificationTier?: boolean
    credentialId?: boolean
    duration?: boolean
    description?: boolean
    skills?: boolean
    image?: boolean
    verificationUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["certificate"]>

  export type CertificateSelectScalar = {
    id?: boolean
    number?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    title?: boolean
    issuer?: boolean
    category?: boolean
    date?: boolean
    score?: boolean
    certificationTier?: boolean
    credentialId?: boolean
    duration?: boolean
    description?: boolean
    skills?: boolean
    image?: boolean
    verificationUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CertificateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "number" | "displayOrder" | "isPublished" | "title" | "issuer" | "category" | "date" | "score" | "certificationTier" | "credentialId" | "duration" | "description" | "skills" | "image" | "verificationUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["certificate"]>

  export type $CertificatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Certificate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      number: string
      displayOrder: number
      isPublished: boolean
      title: string
      issuer: string
      category: string
      date: string
      score: string | null
      certificationTier: string | null
      credentialId: string | null
      duration: string | null
      description: string
      skills: string
      image: string
      verificationUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["certificate"]>
    composites: {}
  }

  type CertificateGetPayload<S extends boolean | null | undefined | CertificateDefaultArgs> = $Result.GetResult<Prisma.$CertificatePayload, S>

  type CertificateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CertificateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CertificateCountAggregateInputType | true
    }

  export interface CertificateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Certificate'], meta: { name: 'Certificate' } }
    /**
     * Find zero or one Certificate that matches the filter.
     * @param {CertificateFindUniqueArgs} args - Arguments to find a Certificate
     * @example
     * // Get one Certificate
     * const certificate = await prisma.certificate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CertificateFindUniqueArgs>(args: SelectSubset<T, CertificateFindUniqueArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Certificate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CertificateFindUniqueOrThrowArgs} args - Arguments to find a Certificate
     * @example
     * // Get one Certificate
     * const certificate = await prisma.certificate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CertificateFindUniqueOrThrowArgs>(args: SelectSubset<T, CertificateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Certificate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateFindFirstArgs} args - Arguments to find a Certificate
     * @example
     * // Get one Certificate
     * const certificate = await prisma.certificate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CertificateFindFirstArgs>(args?: SelectSubset<T, CertificateFindFirstArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Certificate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateFindFirstOrThrowArgs} args - Arguments to find a Certificate
     * @example
     * // Get one Certificate
     * const certificate = await prisma.certificate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CertificateFindFirstOrThrowArgs>(args?: SelectSubset<T, CertificateFindFirstOrThrowArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Certificates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Certificates
     * const certificates = await prisma.certificate.findMany()
     * 
     * // Get first 10 Certificates
     * const certificates = await prisma.certificate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const certificateWithIdOnly = await prisma.certificate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CertificateFindManyArgs>(args?: SelectSubset<T, CertificateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Certificate.
     * @param {CertificateCreateArgs} args - Arguments to create a Certificate.
     * @example
     * // Create one Certificate
     * const Certificate = await prisma.certificate.create({
     *   data: {
     *     // ... data to create a Certificate
     *   }
     * })
     * 
     */
    create<T extends CertificateCreateArgs>(args: SelectSubset<T, CertificateCreateArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Certificates.
     * @param {CertificateCreateManyArgs} args - Arguments to create many Certificates.
     * @example
     * // Create many Certificates
     * const certificate = await prisma.certificate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CertificateCreateManyArgs>(args?: SelectSubset<T, CertificateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Certificates and returns the data saved in the database.
     * @param {CertificateCreateManyAndReturnArgs} args - Arguments to create many Certificates.
     * @example
     * // Create many Certificates
     * const certificate = await prisma.certificate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Certificates and only return the `id`
     * const certificateWithIdOnly = await prisma.certificate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CertificateCreateManyAndReturnArgs>(args?: SelectSubset<T, CertificateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Certificate.
     * @param {CertificateDeleteArgs} args - Arguments to delete one Certificate.
     * @example
     * // Delete one Certificate
     * const Certificate = await prisma.certificate.delete({
     *   where: {
     *     // ... filter to delete one Certificate
     *   }
     * })
     * 
     */
    delete<T extends CertificateDeleteArgs>(args: SelectSubset<T, CertificateDeleteArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Certificate.
     * @param {CertificateUpdateArgs} args - Arguments to update one Certificate.
     * @example
     * // Update one Certificate
     * const certificate = await prisma.certificate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CertificateUpdateArgs>(args: SelectSubset<T, CertificateUpdateArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Certificates.
     * @param {CertificateDeleteManyArgs} args - Arguments to filter Certificates to delete.
     * @example
     * // Delete a few Certificates
     * const { count } = await prisma.certificate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CertificateDeleteManyArgs>(args?: SelectSubset<T, CertificateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Certificates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Certificates
     * const certificate = await prisma.certificate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CertificateUpdateManyArgs>(args: SelectSubset<T, CertificateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Certificates and returns the data updated in the database.
     * @param {CertificateUpdateManyAndReturnArgs} args - Arguments to update many Certificates.
     * @example
     * // Update many Certificates
     * const certificate = await prisma.certificate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Certificates and only return the `id`
     * const certificateWithIdOnly = await prisma.certificate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CertificateUpdateManyAndReturnArgs>(args: SelectSubset<T, CertificateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Certificate.
     * @param {CertificateUpsertArgs} args - Arguments to update or create a Certificate.
     * @example
     * // Update or create a Certificate
     * const certificate = await prisma.certificate.upsert({
     *   create: {
     *     // ... data to create a Certificate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Certificate we want to update
     *   }
     * })
     */
    upsert<T extends CertificateUpsertArgs>(args: SelectSubset<T, CertificateUpsertArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Certificates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateCountArgs} args - Arguments to filter Certificates to count.
     * @example
     * // Count the number of Certificates
     * const count = await prisma.certificate.count({
     *   where: {
     *     // ... the filter for the Certificates we want to count
     *   }
     * })
    **/
    count<T extends CertificateCountArgs>(
      args?: Subset<T, CertificateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CertificateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Certificate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CertificateAggregateArgs>(args: Subset<T, CertificateAggregateArgs>): Prisma.PrismaPromise<GetCertificateAggregateType<T>>

    /**
     * Group by Certificate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CertificateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CertificateGroupByArgs['orderBy'] }
        : { orderBy?: CertificateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CertificateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCertificateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Certificate model
   */
  readonly fields: CertificateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Certificate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CertificateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Certificate model
   */
  interface CertificateFieldRefs {
    readonly id: FieldRef<"Certificate", 'String'>
    readonly number: FieldRef<"Certificate", 'String'>
    readonly displayOrder: FieldRef<"Certificate", 'Int'>
    readonly isPublished: FieldRef<"Certificate", 'Boolean'>
    readonly title: FieldRef<"Certificate", 'String'>
    readonly issuer: FieldRef<"Certificate", 'String'>
    readonly category: FieldRef<"Certificate", 'String'>
    readonly date: FieldRef<"Certificate", 'String'>
    readonly score: FieldRef<"Certificate", 'String'>
    readonly certificationTier: FieldRef<"Certificate", 'String'>
    readonly credentialId: FieldRef<"Certificate", 'String'>
    readonly duration: FieldRef<"Certificate", 'String'>
    readonly description: FieldRef<"Certificate", 'String'>
    readonly skills: FieldRef<"Certificate", 'String'>
    readonly image: FieldRef<"Certificate", 'String'>
    readonly verificationUrl: FieldRef<"Certificate", 'String'>
    readonly createdAt: FieldRef<"Certificate", 'DateTime'>
    readonly updatedAt: FieldRef<"Certificate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Certificate findUnique
   */
  export type CertificateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificate
     */
    omit?: CertificateOmit<ExtArgs> | null
    /**
     * Filter, which Certificate to fetch.
     */
    where: CertificateWhereUniqueInput
  }

  /**
   * Certificate findUniqueOrThrow
   */
  export type CertificateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificate
     */
    omit?: CertificateOmit<ExtArgs> | null
    /**
     * Filter, which Certificate to fetch.
     */
    where: CertificateWhereUniqueInput
  }

  /**
   * Certificate findFirst
   */
  export type CertificateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificate
     */
    omit?: CertificateOmit<ExtArgs> | null
    /**
     * Filter, which Certificate to fetch.
     */
    where?: CertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificates to fetch.
     */
    orderBy?: CertificateOrderByWithRelationInput | CertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Certificates.
     */
    cursor?: CertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certificates.
     */
    distinct?: CertificateScalarFieldEnum | CertificateScalarFieldEnum[]
  }

  /**
   * Certificate findFirstOrThrow
   */
  export type CertificateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificate
     */
    omit?: CertificateOmit<ExtArgs> | null
    /**
     * Filter, which Certificate to fetch.
     */
    where?: CertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificates to fetch.
     */
    orderBy?: CertificateOrderByWithRelationInput | CertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Certificates.
     */
    cursor?: CertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certificates.
     */
    distinct?: CertificateScalarFieldEnum | CertificateScalarFieldEnum[]
  }

  /**
   * Certificate findMany
   */
  export type CertificateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificate
     */
    omit?: CertificateOmit<ExtArgs> | null
    /**
     * Filter, which Certificates to fetch.
     */
    where?: CertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificates to fetch.
     */
    orderBy?: CertificateOrderByWithRelationInput | CertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Certificates.
     */
    cursor?: CertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certificates.
     */
    distinct?: CertificateScalarFieldEnum | CertificateScalarFieldEnum[]
  }

  /**
   * Certificate create
   */
  export type CertificateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificate
     */
    omit?: CertificateOmit<ExtArgs> | null
    /**
     * The data needed to create a Certificate.
     */
    data: XOR<CertificateCreateInput, CertificateUncheckedCreateInput>
  }

  /**
   * Certificate createMany
   */
  export type CertificateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Certificates.
     */
    data: CertificateCreateManyInput | CertificateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Certificate createManyAndReturn
   */
  export type CertificateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Certificate
     */
    omit?: CertificateOmit<ExtArgs> | null
    /**
     * The data used to create many Certificates.
     */
    data: CertificateCreateManyInput | CertificateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Certificate update
   */
  export type CertificateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificate
     */
    omit?: CertificateOmit<ExtArgs> | null
    /**
     * The data needed to update a Certificate.
     */
    data: XOR<CertificateUpdateInput, CertificateUncheckedUpdateInput>
    /**
     * Choose, which Certificate to update.
     */
    where: CertificateWhereUniqueInput
  }

  /**
   * Certificate updateMany
   */
  export type CertificateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Certificates.
     */
    data: XOR<CertificateUpdateManyMutationInput, CertificateUncheckedUpdateManyInput>
    /**
     * Filter which Certificates to update
     */
    where?: CertificateWhereInput
    /**
     * Limit how many Certificates to update.
     */
    limit?: number
  }

  /**
   * Certificate updateManyAndReturn
   */
  export type CertificateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Certificate
     */
    omit?: CertificateOmit<ExtArgs> | null
    /**
     * The data used to update Certificates.
     */
    data: XOR<CertificateUpdateManyMutationInput, CertificateUncheckedUpdateManyInput>
    /**
     * Filter which Certificates to update
     */
    where?: CertificateWhereInput
    /**
     * Limit how many Certificates to update.
     */
    limit?: number
  }

  /**
   * Certificate upsert
   */
  export type CertificateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificate
     */
    omit?: CertificateOmit<ExtArgs> | null
    /**
     * The filter to search for the Certificate to update in case it exists.
     */
    where: CertificateWhereUniqueInput
    /**
     * In case the Certificate found by the `where` argument doesn't exist, create a new Certificate with this data.
     */
    create: XOR<CertificateCreateInput, CertificateUncheckedCreateInput>
    /**
     * In case the Certificate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CertificateUpdateInput, CertificateUncheckedUpdateInput>
  }

  /**
   * Certificate delete
   */
  export type CertificateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificate
     */
    omit?: CertificateOmit<ExtArgs> | null
    /**
     * Filter which Certificate to delete.
     */
    where: CertificateWhereUniqueInput
  }

  /**
   * Certificate deleteMany
   */
  export type CertificateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Certificates to delete
     */
    where?: CertificateWhereInput
    /**
     * Limit how many Certificates to delete.
     */
    limit?: number
  }

  /**
   * Certificate without action
   */
  export type CertificateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificate
     */
    omit?: CertificateOmit<ExtArgs> | null
  }


  /**
   * Model Skill
   */

  export type AggregateSkill = {
    _count: SkillCountAggregateOutputType | null
    _avg: SkillAvgAggregateOutputType | null
    _sum: SkillSumAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  export type SkillAvgAggregateOutputType = {
    proficiency: number | null
    displayOrder: number | null
  }

  export type SkillSumAggregateOutputType = {
    proficiency: number | null
    displayOrder: number | null
  }

  export type SkillMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    proficiency: number | null
    connectedIds: string | null
    displayOrder: number | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SkillMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    proficiency: number | null
    connectedIds: string | null
    displayOrder: number | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SkillCountAggregateOutputType = {
    id: number
    name: number
    category: number
    proficiency: number
    connectedIds: number
    displayOrder: number
    isPublished: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SkillAvgAggregateInputType = {
    proficiency?: true
    displayOrder?: true
  }

  export type SkillSumAggregateInputType = {
    proficiency?: true
    displayOrder?: true
  }

  export type SkillMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    proficiency?: true
    connectedIds?: true
    displayOrder?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SkillMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    proficiency?: true
    connectedIds?: true
    displayOrder?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SkillCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    proficiency?: true
    connectedIds?: true
    displayOrder?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skill to aggregate.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Skills
    **/
    _count?: true | SkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SkillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SkillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkillMaxAggregateInputType
  }

  export type GetSkillAggregateType<T extends SkillAggregateArgs> = {
        [P in keyof T & keyof AggregateSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkill[P]>
      : GetScalarType<T[P], AggregateSkill[P]>
  }




  export type SkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillWhereInput
    orderBy?: SkillOrderByWithAggregationInput | SkillOrderByWithAggregationInput[]
    by: SkillScalarFieldEnum[] | SkillScalarFieldEnum
    having?: SkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkillCountAggregateInputType | true
    _avg?: SkillAvgAggregateInputType
    _sum?: SkillSumAggregateInputType
    _min?: SkillMinAggregateInputType
    _max?: SkillMaxAggregateInputType
  }

  export type SkillGroupByOutputType = {
    id: string
    name: string
    category: string
    proficiency: number
    connectedIds: string
    displayOrder: number
    isPublished: boolean
    createdAt: Date
    updatedAt: Date
    _count: SkillCountAggregateOutputType | null
    _avg: SkillAvgAggregateOutputType | null
    _sum: SkillSumAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  type GetSkillGroupByPayload<T extends SkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillGroupByOutputType[P]>
            : GetScalarType<T[P], SkillGroupByOutputType[P]>
        }
      >
    >


  export type SkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    proficiency?: boolean
    connectedIds?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["skill"]>

  export type SkillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    proficiency?: boolean
    connectedIds?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["skill"]>

  export type SkillSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    proficiency?: boolean
    connectedIds?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["skill"]>

  export type SkillSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    proficiency?: boolean
    connectedIds?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "category" | "proficiency" | "connectedIds" | "displayOrder" | "isPublished" | "createdAt" | "updatedAt", ExtArgs["result"]["skill"]>

  export type $SkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Skill"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      category: string
      proficiency: number
      connectedIds: string
      displayOrder: number
      isPublished: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["skill"]>
    composites: {}
  }

  type SkillGetPayload<S extends boolean | null | undefined | SkillDefaultArgs> = $Result.GetResult<Prisma.$SkillPayload, S>

  type SkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkillCountAggregateInputType | true
    }

  export interface SkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Skill'], meta: { name: 'Skill' } }
    /**
     * Find zero or one Skill that matches the filter.
     * @param {SkillFindUniqueArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkillFindUniqueArgs>(args: SelectSubset<T, SkillFindUniqueArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Skill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkillFindUniqueOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkillFindUniqueOrThrowArgs>(args: SelectSubset<T, SkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Skill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkillFindFirstArgs>(args?: SelectSubset<T, SkillFindFirstArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Skill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkillFindFirstOrThrowArgs>(args?: SelectSubset<T, SkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Skills
     * const skills = await prisma.skill.findMany()
     * 
     * // Get first 10 Skills
     * const skills = await prisma.skill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skillWithIdOnly = await prisma.skill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkillFindManyArgs>(args?: SelectSubset<T, SkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Skill.
     * @param {SkillCreateArgs} args - Arguments to create a Skill.
     * @example
     * // Create one Skill
     * const Skill = await prisma.skill.create({
     *   data: {
     *     // ... data to create a Skill
     *   }
     * })
     * 
     */
    create<T extends SkillCreateArgs>(args: SelectSubset<T, SkillCreateArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Skills.
     * @param {SkillCreateManyArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skill = await prisma.skill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkillCreateManyArgs>(args?: SelectSubset<T, SkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Skills and returns the data saved in the database.
     * @param {SkillCreateManyAndReturnArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skill = await prisma.skill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Skills and only return the `id`
     * const skillWithIdOnly = await prisma.skill.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SkillCreateManyAndReturnArgs>(args?: SelectSubset<T, SkillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Skill.
     * @param {SkillDeleteArgs} args - Arguments to delete one Skill.
     * @example
     * // Delete one Skill
     * const Skill = await prisma.skill.delete({
     *   where: {
     *     // ... filter to delete one Skill
     *   }
     * })
     * 
     */
    delete<T extends SkillDeleteArgs>(args: SelectSubset<T, SkillDeleteArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Skill.
     * @param {SkillUpdateArgs} args - Arguments to update one Skill.
     * @example
     * // Update one Skill
     * const skill = await prisma.skill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkillUpdateArgs>(args: SelectSubset<T, SkillUpdateArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Skills.
     * @param {SkillDeleteManyArgs} args - Arguments to filter Skills to delete.
     * @example
     * // Delete a few Skills
     * const { count } = await prisma.skill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkillDeleteManyArgs>(args?: SelectSubset<T, SkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Skills
     * const skill = await prisma.skill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkillUpdateManyArgs>(args: SelectSubset<T, SkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skills and returns the data updated in the database.
     * @param {SkillUpdateManyAndReturnArgs} args - Arguments to update many Skills.
     * @example
     * // Update many Skills
     * const skill = await prisma.skill.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Skills and only return the `id`
     * const skillWithIdOnly = await prisma.skill.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SkillUpdateManyAndReturnArgs>(args: SelectSubset<T, SkillUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Skill.
     * @param {SkillUpsertArgs} args - Arguments to update or create a Skill.
     * @example
     * // Update or create a Skill
     * const skill = await prisma.skill.upsert({
     *   create: {
     *     // ... data to create a Skill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Skill we want to update
     *   }
     * })
     */
    upsert<T extends SkillUpsertArgs>(args: SelectSubset<T, SkillUpsertArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillCountArgs} args - Arguments to filter Skills to count.
     * @example
     * // Count the number of Skills
     * const count = await prisma.skill.count({
     *   where: {
     *     // ... the filter for the Skills we want to count
     *   }
     * })
    **/
    count<T extends SkillCountArgs>(
      args?: Subset<T, SkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkillAggregateArgs>(args: Subset<T, SkillAggregateArgs>): Prisma.PrismaPromise<GetSkillAggregateType<T>>

    /**
     * Group by Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkillGroupByArgs['orderBy'] }
        : { orderBy?: SkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Skill model
   */
  readonly fields: SkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Skill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Skill model
   */
  interface SkillFieldRefs {
    readonly id: FieldRef<"Skill", 'String'>
    readonly name: FieldRef<"Skill", 'String'>
    readonly category: FieldRef<"Skill", 'String'>
    readonly proficiency: FieldRef<"Skill", 'Int'>
    readonly connectedIds: FieldRef<"Skill", 'String'>
    readonly displayOrder: FieldRef<"Skill", 'Int'>
    readonly isPublished: FieldRef<"Skill", 'Boolean'>
    readonly createdAt: FieldRef<"Skill", 'DateTime'>
    readonly updatedAt: FieldRef<"Skill", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Skill findUnique
   */
  export type SkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill findUniqueOrThrow
   */
  export type SkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill findFirst
   */
  export type SkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill findFirstOrThrow
   */
  export type SkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill findMany
   */
  export type SkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Filter, which Skills to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill create
   */
  export type SkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * The data needed to create a Skill.
     */
    data: XOR<SkillCreateInput, SkillUncheckedCreateInput>
  }

  /**
   * Skill createMany
   */
  export type SkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Skills.
     */
    data: SkillCreateManyInput | SkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Skill createManyAndReturn
   */
  export type SkillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * The data used to create many Skills.
     */
    data: SkillCreateManyInput | SkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Skill update
   */
  export type SkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * The data needed to update a Skill.
     */
    data: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>
    /**
     * Choose, which Skill to update.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill updateMany
   */
  export type SkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Skills.
     */
    data: XOR<SkillUpdateManyMutationInput, SkillUncheckedUpdateManyInput>
    /**
     * Filter which Skills to update
     */
    where?: SkillWhereInput
    /**
     * Limit how many Skills to update.
     */
    limit?: number
  }

  /**
   * Skill updateManyAndReturn
   */
  export type SkillUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * The data used to update Skills.
     */
    data: XOR<SkillUpdateManyMutationInput, SkillUncheckedUpdateManyInput>
    /**
     * Filter which Skills to update
     */
    where?: SkillWhereInput
    /**
     * Limit how many Skills to update.
     */
    limit?: number
  }

  /**
   * Skill upsert
   */
  export type SkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * The filter to search for the Skill to update in case it exists.
     */
    where: SkillWhereUniqueInput
    /**
     * In case the Skill found by the `where` argument doesn't exist, create a new Skill with this data.
     */
    create: XOR<SkillCreateInput, SkillUncheckedCreateInput>
    /**
     * In case the Skill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>
  }

  /**
   * Skill delete
   */
  export type SkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Filter which Skill to delete.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill deleteMany
   */
  export type SkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skills to delete
     */
    where?: SkillWhereInput
    /**
     * Limit how many Skills to delete.
     */
    limit?: number
  }

  /**
   * Skill without action
   */
  export type SkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
  }


  /**
   * Model Education
   */

  export type AggregateEducation = {
    _count: EducationCountAggregateOutputType | null
    _avg: EducationAvgAggregateOutputType | null
    _sum: EducationSumAggregateOutputType | null
    _min: EducationMinAggregateOutputType | null
    _max: EducationMaxAggregateOutputType | null
  }

  export type EducationAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type EducationSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type EducationMinAggregateOutputType = {
    id: string | null
    degree: string | null
    institution: string | null
    period: string | null
    cgpa: string | null
    expectedGraduation: string | null
    field: string | null
    highlights: string | null
    displayOrder: number | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EducationMaxAggregateOutputType = {
    id: string | null
    degree: string | null
    institution: string | null
    period: string | null
    cgpa: string | null
    expectedGraduation: string | null
    field: string | null
    highlights: string | null
    displayOrder: number | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EducationCountAggregateOutputType = {
    id: number
    degree: number
    institution: number
    period: number
    cgpa: number
    expectedGraduation: number
    field: number
    highlights: number
    displayOrder: number
    isPublished: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EducationAvgAggregateInputType = {
    displayOrder?: true
  }

  export type EducationSumAggregateInputType = {
    displayOrder?: true
  }

  export type EducationMinAggregateInputType = {
    id?: true
    degree?: true
    institution?: true
    period?: true
    cgpa?: true
    expectedGraduation?: true
    field?: true
    highlights?: true
    displayOrder?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EducationMaxAggregateInputType = {
    id?: true
    degree?: true
    institution?: true
    period?: true
    cgpa?: true
    expectedGraduation?: true
    field?: true
    highlights?: true
    displayOrder?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EducationCountAggregateInputType = {
    id?: true
    degree?: true
    institution?: true
    period?: true
    cgpa?: true
    expectedGraduation?: true
    field?: true
    highlights?: true
    displayOrder?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EducationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Education to aggregate.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Educations
    **/
    _count?: true | EducationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EducationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EducationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EducationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EducationMaxAggregateInputType
  }

  export type GetEducationAggregateType<T extends EducationAggregateArgs> = {
        [P in keyof T & keyof AggregateEducation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEducation[P]>
      : GetScalarType<T[P], AggregateEducation[P]>
  }




  export type EducationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EducationWhereInput
    orderBy?: EducationOrderByWithAggregationInput | EducationOrderByWithAggregationInput[]
    by: EducationScalarFieldEnum[] | EducationScalarFieldEnum
    having?: EducationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EducationCountAggregateInputType | true
    _avg?: EducationAvgAggregateInputType
    _sum?: EducationSumAggregateInputType
    _min?: EducationMinAggregateInputType
    _max?: EducationMaxAggregateInputType
  }

  export type EducationGroupByOutputType = {
    id: string
    degree: string
    institution: string
    period: string
    cgpa: string
    expectedGraduation: string
    field: string
    highlights: string
    displayOrder: number
    isPublished: boolean
    createdAt: Date
    updatedAt: Date
    _count: EducationCountAggregateOutputType | null
    _avg: EducationAvgAggregateOutputType | null
    _sum: EducationSumAggregateOutputType | null
    _min: EducationMinAggregateOutputType | null
    _max: EducationMaxAggregateOutputType | null
  }

  type GetEducationGroupByPayload<T extends EducationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EducationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EducationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EducationGroupByOutputType[P]>
            : GetScalarType<T[P], EducationGroupByOutputType[P]>
        }
      >
    >


  export type EducationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    degree?: boolean
    institution?: boolean
    period?: boolean
    cgpa?: boolean
    expectedGraduation?: boolean
    field?: boolean
    highlights?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["education"]>

  export type EducationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    degree?: boolean
    institution?: boolean
    period?: boolean
    cgpa?: boolean
    expectedGraduation?: boolean
    field?: boolean
    highlights?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["education"]>

  export type EducationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    degree?: boolean
    institution?: boolean
    period?: boolean
    cgpa?: boolean
    expectedGraduation?: boolean
    field?: boolean
    highlights?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["education"]>

  export type EducationSelectScalar = {
    id?: boolean
    degree?: boolean
    institution?: boolean
    period?: boolean
    cgpa?: boolean
    expectedGraduation?: boolean
    field?: boolean
    highlights?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EducationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "degree" | "institution" | "period" | "cgpa" | "expectedGraduation" | "field" | "highlights" | "displayOrder" | "isPublished" | "createdAt" | "updatedAt", ExtArgs["result"]["education"]>

  export type $EducationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Education"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      degree: string
      institution: string
      period: string
      cgpa: string
      expectedGraduation: string
      field: string
      highlights: string
      displayOrder: number
      isPublished: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["education"]>
    composites: {}
  }

  type EducationGetPayload<S extends boolean | null | undefined | EducationDefaultArgs> = $Result.GetResult<Prisma.$EducationPayload, S>

  type EducationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EducationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EducationCountAggregateInputType | true
    }

  export interface EducationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Education'], meta: { name: 'Education' } }
    /**
     * Find zero or one Education that matches the filter.
     * @param {EducationFindUniqueArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EducationFindUniqueArgs>(args: SelectSubset<T, EducationFindUniqueArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Education that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EducationFindUniqueOrThrowArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EducationFindUniqueOrThrowArgs>(args: SelectSubset<T, EducationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Education that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindFirstArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EducationFindFirstArgs>(args?: SelectSubset<T, EducationFindFirstArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Education that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindFirstOrThrowArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EducationFindFirstOrThrowArgs>(args?: SelectSubset<T, EducationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Educations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Educations
     * const educations = await prisma.education.findMany()
     * 
     * // Get first 10 Educations
     * const educations = await prisma.education.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const educationWithIdOnly = await prisma.education.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EducationFindManyArgs>(args?: SelectSubset<T, EducationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Education.
     * @param {EducationCreateArgs} args - Arguments to create a Education.
     * @example
     * // Create one Education
     * const Education = await prisma.education.create({
     *   data: {
     *     // ... data to create a Education
     *   }
     * })
     * 
     */
    create<T extends EducationCreateArgs>(args: SelectSubset<T, EducationCreateArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Educations.
     * @param {EducationCreateManyArgs} args - Arguments to create many Educations.
     * @example
     * // Create many Educations
     * const education = await prisma.education.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EducationCreateManyArgs>(args?: SelectSubset<T, EducationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Educations and returns the data saved in the database.
     * @param {EducationCreateManyAndReturnArgs} args - Arguments to create many Educations.
     * @example
     * // Create many Educations
     * const education = await prisma.education.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Educations and only return the `id`
     * const educationWithIdOnly = await prisma.education.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EducationCreateManyAndReturnArgs>(args?: SelectSubset<T, EducationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Education.
     * @param {EducationDeleteArgs} args - Arguments to delete one Education.
     * @example
     * // Delete one Education
     * const Education = await prisma.education.delete({
     *   where: {
     *     // ... filter to delete one Education
     *   }
     * })
     * 
     */
    delete<T extends EducationDeleteArgs>(args: SelectSubset<T, EducationDeleteArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Education.
     * @param {EducationUpdateArgs} args - Arguments to update one Education.
     * @example
     * // Update one Education
     * const education = await prisma.education.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EducationUpdateArgs>(args: SelectSubset<T, EducationUpdateArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Educations.
     * @param {EducationDeleteManyArgs} args - Arguments to filter Educations to delete.
     * @example
     * // Delete a few Educations
     * const { count } = await prisma.education.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EducationDeleteManyArgs>(args?: SelectSubset<T, EducationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Educations
     * const education = await prisma.education.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EducationUpdateManyArgs>(args: SelectSubset<T, EducationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Educations and returns the data updated in the database.
     * @param {EducationUpdateManyAndReturnArgs} args - Arguments to update many Educations.
     * @example
     * // Update many Educations
     * const education = await prisma.education.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Educations and only return the `id`
     * const educationWithIdOnly = await prisma.education.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EducationUpdateManyAndReturnArgs>(args: SelectSubset<T, EducationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Education.
     * @param {EducationUpsertArgs} args - Arguments to update or create a Education.
     * @example
     * // Update or create a Education
     * const education = await prisma.education.upsert({
     *   create: {
     *     // ... data to create a Education
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Education we want to update
     *   }
     * })
     */
    upsert<T extends EducationUpsertArgs>(args: SelectSubset<T, EducationUpsertArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationCountArgs} args - Arguments to filter Educations to count.
     * @example
     * // Count the number of Educations
     * const count = await prisma.education.count({
     *   where: {
     *     // ... the filter for the Educations we want to count
     *   }
     * })
    **/
    count<T extends EducationCountArgs>(
      args?: Subset<T, EducationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EducationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Education.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EducationAggregateArgs>(args: Subset<T, EducationAggregateArgs>): Prisma.PrismaPromise<GetEducationAggregateType<T>>

    /**
     * Group by Education.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EducationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EducationGroupByArgs['orderBy'] }
        : { orderBy?: EducationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EducationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEducationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Education model
   */
  readonly fields: EducationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Education.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EducationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Education model
   */
  interface EducationFieldRefs {
    readonly id: FieldRef<"Education", 'String'>
    readonly degree: FieldRef<"Education", 'String'>
    readonly institution: FieldRef<"Education", 'String'>
    readonly period: FieldRef<"Education", 'String'>
    readonly cgpa: FieldRef<"Education", 'String'>
    readonly expectedGraduation: FieldRef<"Education", 'String'>
    readonly field: FieldRef<"Education", 'String'>
    readonly highlights: FieldRef<"Education", 'String'>
    readonly displayOrder: FieldRef<"Education", 'Int'>
    readonly isPublished: FieldRef<"Education", 'Boolean'>
    readonly createdAt: FieldRef<"Education", 'DateTime'>
    readonly updatedAt: FieldRef<"Education", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Education findUnique
   */
  export type EducationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education findUniqueOrThrow
   */
  export type EducationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education findFirst
   */
  export type EducationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Educations.
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Educations.
     */
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * Education findFirstOrThrow
   */
  export type EducationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Educations.
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Educations.
     */
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * Education findMany
   */
  export type EducationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Filter, which Educations to fetch.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Educations.
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Educations.
     */
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * Education create
   */
  export type EducationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The data needed to create a Education.
     */
    data: XOR<EducationCreateInput, EducationUncheckedCreateInput>
  }

  /**
   * Education createMany
   */
  export type EducationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Educations.
     */
    data: EducationCreateManyInput | EducationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Education createManyAndReturn
   */
  export type EducationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The data used to create many Educations.
     */
    data: EducationCreateManyInput | EducationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Education update
   */
  export type EducationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The data needed to update a Education.
     */
    data: XOR<EducationUpdateInput, EducationUncheckedUpdateInput>
    /**
     * Choose, which Education to update.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education updateMany
   */
  export type EducationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Educations.
     */
    data: XOR<EducationUpdateManyMutationInput, EducationUncheckedUpdateManyInput>
    /**
     * Filter which Educations to update
     */
    where?: EducationWhereInput
    /**
     * Limit how many Educations to update.
     */
    limit?: number
  }

  /**
   * Education updateManyAndReturn
   */
  export type EducationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The data used to update Educations.
     */
    data: XOR<EducationUpdateManyMutationInput, EducationUncheckedUpdateManyInput>
    /**
     * Filter which Educations to update
     */
    where?: EducationWhereInput
    /**
     * Limit how many Educations to update.
     */
    limit?: number
  }

  /**
   * Education upsert
   */
  export type EducationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The filter to search for the Education to update in case it exists.
     */
    where: EducationWhereUniqueInput
    /**
     * In case the Education found by the `where` argument doesn't exist, create a new Education with this data.
     */
    create: XOR<EducationCreateInput, EducationUncheckedCreateInput>
    /**
     * In case the Education was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EducationUpdateInput, EducationUncheckedUpdateInput>
  }

  /**
   * Education delete
   */
  export type EducationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Filter which Education to delete.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education deleteMany
   */
  export type EducationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Educations to delete
     */
    where?: EducationWhereInput
    /**
     * Limit how many Educations to delete.
     */
    limit?: number
  }

  /**
   * Education without action
   */
  export type EducationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
  }


  /**
   * Model Experience
   */

  export type AggregateExperience = {
    _count: ExperienceCountAggregateOutputType | null
    _avg: ExperienceAvgAggregateOutputType | null
    _sum: ExperienceSumAggregateOutputType | null
    _min: ExperienceMinAggregateOutputType | null
    _max: ExperienceMaxAggregateOutputType | null
  }

  export type ExperienceAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type ExperienceSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type ExperienceMinAggregateOutputType = {
    id: string | null
    organization: string | null
    title: string | null
    period: string | null
    type: string | null
    location: string | null
    description: string | null
    highlights: string | null
    displayOrder: number | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExperienceMaxAggregateOutputType = {
    id: string | null
    organization: string | null
    title: string | null
    period: string | null
    type: string | null
    location: string | null
    description: string | null
    highlights: string | null
    displayOrder: number | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExperienceCountAggregateOutputType = {
    id: number
    organization: number
    title: number
    period: number
    type: number
    location: number
    description: number
    highlights: number
    displayOrder: number
    isPublished: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExperienceAvgAggregateInputType = {
    displayOrder?: true
  }

  export type ExperienceSumAggregateInputType = {
    displayOrder?: true
  }

  export type ExperienceMinAggregateInputType = {
    id?: true
    organization?: true
    title?: true
    period?: true
    type?: true
    location?: true
    description?: true
    highlights?: true
    displayOrder?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExperienceMaxAggregateInputType = {
    id?: true
    organization?: true
    title?: true
    period?: true
    type?: true
    location?: true
    description?: true
    highlights?: true
    displayOrder?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExperienceCountAggregateInputType = {
    id?: true
    organization?: true
    title?: true
    period?: true
    type?: true
    location?: true
    description?: true
    highlights?: true
    displayOrder?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExperienceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Experience to aggregate.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Experiences
    **/
    _count?: true | ExperienceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExperienceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExperienceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExperienceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExperienceMaxAggregateInputType
  }

  export type GetExperienceAggregateType<T extends ExperienceAggregateArgs> = {
        [P in keyof T & keyof AggregateExperience]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExperience[P]>
      : GetScalarType<T[P], AggregateExperience[P]>
  }




  export type ExperienceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperienceWhereInput
    orderBy?: ExperienceOrderByWithAggregationInput | ExperienceOrderByWithAggregationInput[]
    by: ExperienceScalarFieldEnum[] | ExperienceScalarFieldEnum
    having?: ExperienceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExperienceCountAggregateInputType | true
    _avg?: ExperienceAvgAggregateInputType
    _sum?: ExperienceSumAggregateInputType
    _min?: ExperienceMinAggregateInputType
    _max?: ExperienceMaxAggregateInputType
  }

  export type ExperienceGroupByOutputType = {
    id: string
    organization: string
    title: string
    period: string
    type: string
    location: string
    description: string
    highlights: string
    displayOrder: number
    isPublished: boolean
    createdAt: Date
    updatedAt: Date
    _count: ExperienceCountAggregateOutputType | null
    _avg: ExperienceAvgAggregateOutputType | null
    _sum: ExperienceSumAggregateOutputType | null
    _min: ExperienceMinAggregateOutputType | null
    _max: ExperienceMaxAggregateOutputType | null
  }

  type GetExperienceGroupByPayload<T extends ExperienceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExperienceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExperienceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExperienceGroupByOutputType[P]>
            : GetScalarType<T[P], ExperienceGroupByOutputType[P]>
        }
      >
    >


  export type ExperienceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organization?: boolean
    title?: boolean
    period?: boolean
    type?: boolean
    location?: boolean
    description?: boolean
    highlights?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["experience"]>

  export type ExperienceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organization?: boolean
    title?: boolean
    period?: boolean
    type?: boolean
    location?: boolean
    description?: boolean
    highlights?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["experience"]>

  export type ExperienceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organization?: boolean
    title?: boolean
    period?: boolean
    type?: boolean
    location?: boolean
    description?: boolean
    highlights?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["experience"]>

  export type ExperienceSelectScalar = {
    id?: boolean
    organization?: boolean
    title?: boolean
    period?: boolean
    type?: boolean
    location?: boolean
    description?: boolean
    highlights?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExperienceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organization" | "title" | "period" | "type" | "location" | "description" | "highlights" | "displayOrder" | "isPublished" | "createdAt" | "updatedAt", ExtArgs["result"]["experience"]>

  export type $ExperiencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Experience"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organization: string
      title: string
      period: string
      type: string
      location: string
      description: string
      highlights: string
      displayOrder: number
      isPublished: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["experience"]>
    composites: {}
  }

  type ExperienceGetPayload<S extends boolean | null | undefined | ExperienceDefaultArgs> = $Result.GetResult<Prisma.$ExperiencePayload, S>

  type ExperienceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExperienceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExperienceCountAggregateInputType | true
    }

  export interface ExperienceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Experience'], meta: { name: 'Experience' } }
    /**
     * Find zero or one Experience that matches the filter.
     * @param {ExperienceFindUniqueArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExperienceFindUniqueArgs>(args: SelectSubset<T, ExperienceFindUniqueArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Experience that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExperienceFindUniqueOrThrowArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExperienceFindUniqueOrThrowArgs>(args: SelectSubset<T, ExperienceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Experience that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindFirstArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExperienceFindFirstArgs>(args?: SelectSubset<T, ExperienceFindFirstArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Experience that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindFirstOrThrowArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExperienceFindFirstOrThrowArgs>(args?: SelectSubset<T, ExperienceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Experiences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Experiences
     * const experiences = await prisma.experience.findMany()
     * 
     * // Get first 10 Experiences
     * const experiences = await prisma.experience.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const experienceWithIdOnly = await prisma.experience.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExperienceFindManyArgs>(args?: SelectSubset<T, ExperienceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Experience.
     * @param {ExperienceCreateArgs} args - Arguments to create a Experience.
     * @example
     * // Create one Experience
     * const Experience = await prisma.experience.create({
     *   data: {
     *     // ... data to create a Experience
     *   }
     * })
     * 
     */
    create<T extends ExperienceCreateArgs>(args: SelectSubset<T, ExperienceCreateArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Experiences.
     * @param {ExperienceCreateManyArgs} args - Arguments to create many Experiences.
     * @example
     * // Create many Experiences
     * const experience = await prisma.experience.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExperienceCreateManyArgs>(args?: SelectSubset<T, ExperienceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Experiences and returns the data saved in the database.
     * @param {ExperienceCreateManyAndReturnArgs} args - Arguments to create many Experiences.
     * @example
     * // Create many Experiences
     * const experience = await prisma.experience.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Experiences and only return the `id`
     * const experienceWithIdOnly = await prisma.experience.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExperienceCreateManyAndReturnArgs>(args?: SelectSubset<T, ExperienceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Experience.
     * @param {ExperienceDeleteArgs} args - Arguments to delete one Experience.
     * @example
     * // Delete one Experience
     * const Experience = await prisma.experience.delete({
     *   where: {
     *     // ... filter to delete one Experience
     *   }
     * })
     * 
     */
    delete<T extends ExperienceDeleteArgs>(args: SelectSubset<T, ExperienceDeleteArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Experience.
     * @param {ExperienceUpdateArgs} args - Arguments to update one Experience.
     * @example
     * // Update one Experience
     * const experience = await prisma.experience.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExperienceUpdateArgs>(args: SelectSubset<T, ExperienceUpdateArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Experiences.
     * @param {ExperienceDeleteManyArgs} args - Arguments to filter Experiences to delete.
     * @example
     * // Delete a few Experiences
     * const { count } = await prisma.experience.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExperienceDeleteManyArgs>(args?: SelectSubset<T, ExperienceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Experiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Experiences
     * const experience = await prisma.experience.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExperienceUpdateManyArgs>(args: SelectSubset<T, ExperienceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Experiences and returns the data updated in the database.
     * @param {ExperienceUpdateManyAndReturnArgs} args - Arguments to update many Experiences.
     * @example
     * // Update many Experiences
     * const experience = await prisma.experience.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Experiences and only return the `id`
     * const experienceWithIdOnly = await prisma.experience.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExperienceUpdateManyAndReturnArgs>(args: SelectSubset<T, ExperienceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Experience.
     * @param {ExperienceUpsertArgs} args - Arguments to update or create a Experience.
     * @example
     * // Update or create a Experience
     * const experience = await prisma.experience.upsert({
     *   create: {
     *     // ... data to create a Experience
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Experience we want to update
     *   }
     * })
     */
    upsert<T extends ExperienceUpsertArgs>(args: SelectSubset<T, ExperienceUpsertArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Experiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceCountArgs} args - Arguments to filter Experiences to count.
     * @example
     * // Count the number of Experiences
     * const count = await prisma.experience.count({
     *   where: {
     *     // ... the filter for the Experiences we want to count
     *   }
     * })
    **/
    count<T extends ExperienceCountArgs>(
      args?: Subset<T, ExperienceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExperienceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Experience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExperienceAggregateArgs>(args: Subset<T, ExperienceAggregateArgs>): Prisma.PrismaPromise<GetExperienceAggregateType<T>>

    /**
     * Group by Experience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExperienceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExperienceGroupByArgs['orderBy'] }
        : { orderBy?: ExperienceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExperienceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExperienceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Experience model
   */
  readonly fields: ExperienceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Experience.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExperienceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Experience model
   */
  interface ExperienceFieldRefs {
    readonly id: FieldRef<"Experience", 'String'>
    readonly organization: FieldRef<"Experience", 'String'>
    readonly title: FieldRef<"Experience", 'String'>
    readonly period: FieldRef<"Experience", 'String'>
    readonly type: FieldRef<"Experience", 'String'>
    readonly location: FieldRef<"Experience", 'String'>
    readonly description: FieldRef<"Experience", 'String'>
    readonly highlights: FieldRef<"Experience", 'String'>
    readonly displayOrder: FieldRef<"Experience", 'Int'>
    readonly isPublished: FieldRef<"Experience", 'Boolean'>
    readonly createdAt: FieldRef<"Experience", 'DateTime'>
    readonly updatedAt: FieldRef<"Experience", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Experience findUnique
   */
  export type ExperienceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience findUniqueOrThrow
   */
  export type ExperienceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience findFirst
   */
  export type ExperienceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Experiences.
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Experiences.
     */
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Experience findFirstOrThrow
   */
  export type ExperienceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Experiences.
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Experiences.
     */
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Experience findMany
   */
  export type ExperienceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Filter, which Experiences to fetch.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Experiences.
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Experiences.
     */
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Experience create
   */
  export type ExperienceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * The data needed to create a Experience.
     */
    data: XOR<ExperienceCreateInput, ExperienceUncheckedCreateInput>
  }

  /**
   * Experience createMany
   */
  export type ExperienceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Experiences.
     */
    data: ExperienceCreateManyInput | ExperienceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Experience createManyAndReturn
   */
  export type ExperienceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * The data used to create many Experiences.
     */
    data: ExperienceCreateManyInput | ExperienceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Experience update
   */
  export type ExperienceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * The data needed to update a Experience.
     */
    data: XOR<ExperienceUpdateInput, ExperienceUncheckedUpdateInput>
    /**
     * Choose, which Experience to update.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience updateMany
   */
  export type ExperienceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Experiences.
     */
    data: XOR<ExperienceUpdateManyMutationInput, ExperienceUncheckedUpdateManyInput>
    /**
     * Filter which Experiences to update
     */
    where?: ExperienceWhereInput
    /**
     * Limit how many Experiences to update.
     */
    limit?: number
  }

  /**
   * Experience updateManyAndReturn
   */
  export type ExperienceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * The data used to update Experiences.
     */
    data: XOR<ExperienceUpdateManyMutationInput, ExperienceUncheckedUpdateManyInput>
    /**
     * Filter which Experiences to update
     */
    where?: ExperienceWhereInput
    /**
     * Limit how many Experiences to update.
     */
    limit?: number
  }

  /**
   * Experience upsert
   */
  export type ExperienceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * The filter to search for the Experience to update in case it exists.
     */
    where: ExperienceWhereUniqueInput
    /**
     * In case the Experience found by the `where` argument doesn't exist, create a new Experience with this data.
     */
    create: XOR<ExperienceCreateInput, ExperienceUncheckedCreateInput>
    /**
     * In case the Experience was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExperienceUpdateInput, ExperienceUncheckedUpdateInput>
  }

  /**
   * Experience delete
   */
  export type ExperienceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Filter which Experience to delete.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience deleteMany
   */
  export type ExperienceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Experiences to delete
     */
    where?: ExperienceWhereInput
    /**
     * Limit how many Experiences to delete.
     */
    limit?: number
  }

  /**
   * Experience without action
   */
  export type ExperienceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
  }


  /**
   * Model Achievement
   */

  export type AggregateAchievement = {
    _count: AchievementCountAggregateOutputType | null
    _avg: AchievementAvgAggregateOutputType | null
    _sum: AchievementSumAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  export type AchievementAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type AchievementSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type AchievementMinAggregateOutputType = {
    id: string | null
    metric: string | null
    title: string | null
    category: string | null
    description: string | null
    displayOrder: number | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AchievementMaxAggregateOutputType = {
    id: string | null
    metric: string | null
    title: string | null
    category: string | null
    description: string | null
    displayOrder: number | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AchievementCountAggregateOutputType = {
    id: number
    metric: number
    title: number
    category: number
    description: number
    displayOrder: number
    isPublished: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AchievementAvgAggregateInputType = {
    displayOrder?: true
  }

  export type AchievementSumAggregateInputType = {
    displayOrder?: true
  }

  export type AchievementMinAggregateInputType = {
    id?: true
    metric?: true
    title?: true
    category?: true
    description?: true
    displayOrder?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AchievementMaxAggregateInputType = {
    id?: true
    metric?: true
    title?: true
    category?: true
    description?: true
    displayOrder?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AchievementCountAggregateInputType = {
    id?: true
    metric?: true
    title?: true
    category?: true
    description?: true
    displayOrder?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AchievementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievement to aggregate.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Achievements
    **/
    _count?: true | AchievementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AchievementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AchievementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AchievementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AchievementMaxAggregateInputType
  }

  export type GetAchievementAggregateType<T extends AchievementAggregateArgs> = {
        [P in keyof T & keyof AggregateAchievement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAchievement[P]>
      : GetScalarType<T[P], AggregateAchievement[P]>
  }




  export type AchievementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AchievementWhereInput
    orderBy?: AchievementOrderByWithAggregationInput | AchievementOrderByWithAggregationInput[]
    by: AchievementScalarFieldEnum[] | AchievementScalarFieldEnum
    having?: AchievementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AchievementCountAggregateInputType | true
    _avg?: AchievementAvgAggregateInputType
    _sum?: AchievementSumAggregateInputType
    _min?: AchievementMinAggregateInputType
    _max?: AchievementMaxAggregateInputType
  }

  export type AchievementGroupByOutputType = {
    id: string
    metric: string
    title: string
    category: string
    description: string
    displayOrder: number
    isPublished: boolean
    createdAt: Date
    updatedAt: Date
    _count: AchievementCountAggregateOutputType | null
    _avg: AchievementAvgAggregateOutputType | null
    _sum: AchievementSumAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  type GetAchievementGroupByPayload<T extends AchievementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AchievementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AchievementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AchievementGroupByOutputType[P]>
            : GetScalarType<T[P], AchievementGroupByOutputType[P]>
        }
      >
    >


  export type AchievementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metric?: boolean
    title?: boolean
    category?: boolean
    description?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metric?: boolean
    title?: boolean
    category?: boolean
    description?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metric?: boolean
    title?: boolean
    category?: boolean
    description?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectScalar = {
    id?: boolean
    metric?: boolean
    title?: boolean
    category?: boolean
    description?: boolean
    displayOrder?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AchievementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "metric" | "title" | "category" | "description" | "displayOrder" | "isPublished" | "createdAt" | "updatedAt", ExtArgs["result"]["achievement"]>

  export type $AchievementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Achievement"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      metric: string
      title: string
      category: string
      description: string
      displayOrder: number
      isPublished: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["achievement"]>
    composites: {}
  }

  type AchievementGetPayload<S extends boolean | null | undefined | AchievementDefaultArgs> = $Result.GetResult<Prisma.$AchievementPayload, S>

  type AchievementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AchievementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AchievementCountAggregateInputType | true
    }

  export interface AchievementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Achievement'], meta: { name: 'Achievement' } }
    /**
     * Find zero or one Achievement that matches the filter.
     * @param {AchievementFindUniqueArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AchievementFindUniqueArgs>(args: SelectSubset<T, AchievementFindUniqueArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Achievement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AchievementFindUniqueOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AchievementFindUniqueOrThrowArgs>(args: SelectSubset<T, AchievementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AchievementFindFirstArgs>(args?: SelectSubset<T, AchievementFindFirstArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AchievementFindFirstOrThrowArgs>(args?: SelectSubset<T, AchievementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Achievements
     * const achievements = await prisma.achievement.findMany()
     * 
     * // Get first 10 Achievements
     * const achievements = await prisma.achievement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const achievementWithIdOnly = await prisma.achievement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AchievementFindManyArgs>(args?: SelectSubset<T, AchievementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Achievement.
     * @param {AchievementCreateArgs} args - Arguments to create a Achievement.
     * @example
     * // Create one Achievement
     * const Achievement = await prisma.achievement.create({
     *   data: {
     *     // ... data to create a Achievement
     *   }
     * })
     * 
     */
    create<T extends AchievementCreateArgs>(args: SelectSubset<T, AchievementCreateArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Achievements.
     * @param {AchievementCreateManyArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AchievementCreateManyArgs>(args?: SelectSubset<T, AchievementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Achievements and returns the data saved in the database.
     * @param {AchievementCreateManyAndReturnArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Achievements and only return the `id`
     * const achievementWithIdOnly = await prisma.achievement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AchievementCreateManyAndReturnArgs>(args?: SelectSubset<T, AchievementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Achievement.
     * @param {AchievementDeleteArgs} args - Arguments to delete one Achievement.
     * @example
     * // Delete one Achievement
     * const Achievement = await prisma.achievement.delete({
     *   where: {
     *     // ... filter to delete one Achievement
     *   }
     * })
     * 
     */
    delete<T extends AchievementDeleteArgs>(args: SelectSubset<T, AchievementDeleteArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Achievement.
     * @param {AchievementUpdateArgs} args - Arguments to update one Achievement.
     * @example
     * // Update one Achievement
     * const achievement = await prisma.achievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AchievementUpdateArgs>(args: SelectSubset<T, AchievementUpdateArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Achievements.
     * @param {AchievementDeleteManyArgs} args - Arguments to filter Achievements to delete.
     * @example
     * // Delete a few Achievements
     * const { count } = await prisma.achievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AchievementDeleteManyArgs>(args?: SelectSubset<T, AchievementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AchievementUpdateManyArgs>(args: SelectSubset<T, AchievementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements and returns the data updated in the database.
     * @param {AchievementUpdateManyAndReturnArgs} args - Arguments to update many Achievements.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Achievements and only return the `id`
     * const achievementWithIdOnly = await prisma.achievement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AchievementUpdateManyAndReturnArgs>(args: SelectSubset<T, AchievementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Achievement.
     * @param {AchievementUpsertArgs} args - Arguments to update or create a Achievement.
     * @example
     * // Update or create a Achievement
     * const achievement = await prisma.achievement.upsert({
     *   create: {
     *     // ... data to create a Achievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Achievement we want to update
     *   }
     * })
     */
    upsert<T extends AchievementUpsertArgs>(args: SelectSubset<T, AchievementUpsertArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementCountArgs} args - Arguments to filter Achievements to count.
     * @example
     * // Count the number of Achievements
     * const count = await prisma.achievement.count({
     *   where: {
     *     // ... the filter for the Achievements we want to count
     *   }
     * })
    **/
    count<T extends AchievementCountArgs>(
      args?: Subset<T, AchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AchievementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AchievementAggregateArgs>(args: Subset<T, AchievementAggregateArgs>): Prisma.PrismaPromise<GetAchievementAggregateType<T>>

    /**
     * Group by Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AchievementGroupByArgs['orderBy'] }
        : { orderBy?: AchievementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AchievementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAchievementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Achievement model
   */
  readonly fields: AchievementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Achievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AchievementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Achievement model
   */
  interface AchievementFieldRefs {
    readonly id: FieldRef<"Achievement", 'String'>
    readonly metric: FieldRef<"Achievement", 'String'>
    readonly title: FieldRef<"Achievement", 'String'>
    readonly category: FieldRef<"Achievement", 'String'>
    readonly description: FieldRef<"Achievement", 'String'>
    readonly displayOrder: FieldRef<"Achievement", 'Int'>
    readonly isPublished: FieldRef<"Achievement", 'Boolean'>
    readonly createdAt: FieldRef<"Achievement", 'DateTime'>
    readonly updatedAt: FieldRef<"Achievement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Achievement findUnique
   */
  export type AchievementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement findUniqueOrThrow
   */
  export type AchievementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement findFirst
   */
  export type AchievementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement findFirstOrThrow
   */
  export type AchievementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement findMany
   */
  export type AchievementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Filter, which Achievements to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement create
   */
  export type AchievementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * The data needed to create a Achievement.
     */
    data: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
  }

  /**
   * Achievement createMany
   */
  export type AchievementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Achievement createManyAndReturn
   */
  export type AchievementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Achievement update
   */
  export type AchievementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * The data needed to update a Achievement.
     */
    data: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
    /**
     * Choose, which Achievement to update.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement updateMany
   */
  export type AchievementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Achievements.
     */
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyInput>
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to update.
     */
    limit?: number
  }

  /**
   * Achievement updateManyAndReturn
   */
  export type AchievementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * The data used to update Achievements.
     */
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyInput>
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to update.
     */
    limit?: number
  }

  /**
   * Achievement upsert
   */
  export type AchievementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * The filter to search for the Achievement to update in case it exists.
     */
    where: AchievementWhereUniqueInput
    /**
     * In case the Achievement found by the `where` argument doesn't exist, create a new Achievement with this data.
     */
    create: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
    /**
     * In case the Achievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
  }

  /**
   * Achievement delete
   */
  export type AchievementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Filter which Achievement to delete.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement deleteMany
   */
  export type AchievementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievements to delete
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to delete.
     */
    limit?: number
  }

  /**
   * Achievement without action
   */
  export type AchievementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
  }


  /**
   * Model PersonalInfo
   */

  export type AggregatePersonalInfo = {
    _count: PersonalInfoCountAggregateOutputType | null
    _min: PersonalInfoMinAggregateOutputType | null
    _max: PersonalInfoMaxAggregateOutputType | null
  }

  export type PersonalInfoMinAggregateOutputType = {
    id: string | null
    name: string | null
    fullName: string | null
    greeting: string | null
    title: string | null
    roles: string | null
    tagline: string | null
    description: string | null
    selfIntroVideo: string | null
    educationSummary: string | null
    cta: string | null
    social: string | null
    media: string | null
    updatedAt: Date | null
  }

  export type PersonalInfoMaxAggregateOutputType = {
    id: string | null
    name: string | null
    fullName: string | null
    greeting: string | null
    title: string | null
    roles: string | null
    tagline: string | null
    description: string | null
    selfIntroVideo: string | null
    educationSummary: string | null
    cta: string | null
    social: string | null
    media: string | null
    updatedAt: Date | null
  }

  export type PersonalInfoCountAggregateOutputType = {
    id: number
    name: number
    fullName: number
    greeting: number
    title: number
    roles: number
    tagline: number
    description: number
    selfIntroVideo: number
    educationSummary: number
    cta: number
    social: number
    media: number
    updatedAt: number
    _all: number
  }


  export type PersonalInfoMinAggregateInputType = {
    id?: true
    name?: true
    fullName?: true
    greeting?: true
    title?: true
    roles?: true
    tagline?: true
    description?: true
    selfIntroVideo?: true
    educationSummary?: true
    cta?: true
    social?: true
    media?: true
    updatedAt?: true
  }

  export type PersonalInfoMaxAggregateInputType = {
    id?: true
    name?: true
    fullName?: true
    greeting?: true
    title?: true
    roles?: true
    tagline?: true
    description?: true
    selfIntroVideo?: true
    educationSummary?: true
    cta?: true
    social?: true
    media?: true
    updatedAt?: true
  }

  export type PersonalInfoCountAggregateInputType = {
    id?: true
    name?: true
    fullName?: true
    greeting?: true
    title?: true
    roles?: true
    tagline?: true
    description?: true
    selfIntroVideo?: true
    educationSummary?: true
    cta?: true
    social?: true
    media?: true
    updatedAt?: true
    _all?: true
  }

  export type PersonalInfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonalInfo to aggregate.
     */
    where?: PersonalInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalInfos to fetch.
     */
    orderBy?: PersonalInfoOrderByWithRelationInput | PersonalInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonalInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PersonalInfos
    **/
    _count?: true | PersonalInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonalInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonalInfoMaxAggregateInputType
  }

  export type GetPersonalInfoAggregateType<T extends PersonalInfoAggregateArgs> = {
        [P in keyof T & keyof AggregatePersonalInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePersonalInfo[P]>
      : GetScalarType<T[P], AggregatePersonalInfo[P]>
  }




  export type PersonalInfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonalInfoWhereInput
    orderBy?: PersonalInfoOrderByWithAggregationInput | PersonalInfoOrderByWithAggregationInput[]
    by: PersonalInfoScalarFieldEnum[] | PersonalInfoScalarFieldEnum
    having?: PersonalInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonalInfoCountAggregateInputType | true
    _min?: PersonalInfoMinAggregateInputType
    _max?: PersonalInfoMaxAggregateInputType
  }

  export type PersonalInfoGroupByOutputType = {
    id: string
    name: string
    fullName: string
    greeting: string
    title: string
    roles: string
    tagline: string
    description: string
    selfIntroVideo: string
    educationSummary: string
    cta: string
    social: string
    media: string
    updatedAt: Date
    _count: PersonalInfoCountAggregateOutputType | null
    _min: PersonalInfoMinAggregateOutputType | null
    _max: PersonalInfoMaxAggregateOutputType | null
  }

  type GetPersonalInfoGroupByPayload<T extends PersonalInfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonalInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonalInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonalInfoGroupByOutputType[P]>
            : GetScalarType<T[P], PersonalInfoGroupByOutputType[P]>
        }
      >
    >


  export type PersonalInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    fullName?: boolean
    greeting?: boolean
    title?: boolean
    roles?: boolean
    tagline?: boolean
    description?: boolean
    selfIntroVideo?: boolean
    educationSummary?: boolean
    cta?: boolean
    social?: boolean
    media?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["personalInfo"]>

  export type PersonalInfoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    fullName?: boolean
    greeting?: boolean
    title?: boolean
    roles?: boolean
    tagline?: boolean
    description?: boolean
    selfIntroVideo?: boolean
    educationSummary?: boolean
    cta?: boolean
    social?: boolean
    media?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["personalInfo"]>

  export type PersonalInfoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    fullName?: boolean
    greeting?: boolean
    title?: boolean
    roles?: boolean
    tagline?: boolean
    description?: boolean
    selfIntroVideo?: boolean
    educationSummary?: boolean
    cta?: boolean
    social?: boolean
    media?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["personalInfo"]>

  export type PersonalInfoSelectScalar = {
    id?: boolean
    name?: boolean
    fullName?: boolean
    greeting?: boolean
    title?: boolean
    roles?: boolean
    tagline?: boolean
    description?: boolean
    selfIntroVideo?: boolean
    educationSummary?: boolean
    cta?: boolean
    social?: boolean
    media?: boolean
    updatedAt?: boolean
  }

  export type PersonalInfoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "fullName" | "greeting" | "title" | "roles" | "tagline" | "description" | "selfIntroVideo" | "educationSummary" | "cta" | "social" | "media" | "updatedAt", ExtArgs["result"]["personalInfo"]>

  export type $PersonalInfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PersonalInfo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      fullName: string
      greeting: string
      title: string
      roles: string
      tagline: string
      description: string
      selfIntroVideo: string
      educationSummary: string
      cta: string
      social: string
      media: string
      updatedAt: Date
    }, ExtArgs["result"]["personalInfo"]>
    composites: {}
  }

  type PersonalInfoGetPayload<S extends boolean | null | undefined | PersonalInfoDefaultArgs> = $Result.GetResult<Prisma.$PersonalInfoPayload, S>

  type PersonalInfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonalInfoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonalInfoCountAggregateInputType | true
    }

  export interface PersonalInfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PersonalInfo'], meta: { name: 'PersonalInfo' } }
    /**
     * Find zero or one PersonalInfo that matches the filter.
     * @param {PersonalInfoFindUniqueArgs} args - Arguments to find a PersonalInfo
     * @example
     * // Get one PersonalInfo
     * const personalInfo = await prisma.personalInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonalInfoFindUniqueArgs>(args: SelectSubset<T, PersonalInfoFindUniqueArgs<ExtArgs>>): Prisma__PersonalInfoClient<$Result.GetResult<Prisma.$PersonalInfoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PersonalInfo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonalInfoFindUniqueOrThrowArgs} args - Arguments to find a PersonalInfo
     * @example
     * // Get one PersonalInfo
     * const personalInfo = await prisma.personalInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonalInfoFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonalInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonalInfoClient<$Result.GetResult<Prisma.$PersonalInfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonalInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalInfoFindFirstArgs} args - Arguments to find a PersonalInfo
     * @example
     * // Get one PersonalInfo
     * const personalInfo = await prisma.personalInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonalInfoFindFirstArgs>(args?: SelectSubset<T, PersonalInfoFindFirstArgs<ExtArgs>>): Prisma__PersonalInfoClient<$Result.GetResult<Prisma.$PersonalInfoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonalInfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalInfoFindFirstOrThrowArgs} args - Arguments to find a PersonalInfo
     * @example
     * // Get one PersonalInfo
     * const personalInfo = await prisma.personalInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonalInfoFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonalInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonalInfoClient<$Result.GetResult<Prisma.$PersonalInfoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PersonalInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalInfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PersonalInfos
     * const personalInfos = await prisma.personalInfo.findMany()
     * 
     * // Get first 10 PersonalInfos
     * const personalInfos = await prisma.personalInfo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personalInfoWithIdOnly = await prisma.personalInfo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonalInfoFindManyArgs>(args?: SelectSubset<T, PersonalInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalInfoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PersonalInfo.
     * @param {PersonalInfoCreateArgs} args - Arguments to create a PersonalInfo.
     * @example
     * // Create one PersonalInfo
     * const PersonalInfo = await prisma.personalInfo.create({
     *   data: {
     *     // ... data to create a PersonalInfo
     *   }
     * })
     * 
     */
    create<T extends PersonalInfoCreateArgs>(args: SelectSubset<T, PersonalInfoCreateArgs<ExtArgs>>): Prisma__PersonalInfoClient<$Result.GetResult<Prisma.$PersonalInfoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PersonalInfos.
     * @param {PersonalInfoCreateManyArgs} args - Arguments to create many PersonalInfos.
     * @example
     * // Create many PersonalInfos
     * const personalInfo = await prisma.personalInfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonalInfoCreateManyArgs>(args?: SelectSubset<T, PersonalInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PersonalInfos and returns the data saved in the database.
     * @param {PersonalInfoCreateManyAndReturnArgs} args - Arguments to create many PersonalInfos.
     * @example
     * // Create many PersonalInfos
     * const personalInfo = await prisma.personalInfo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PersonalInfos and only return the `id`
     * const personalInfoWithIdOnly = await prisma.personalInfo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonalInfoCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonalInfoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalInfoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PersonalInfo.
     * @param {PersonalInfoDeleteArgs} args - Arguments to delete one PersonalInfo.
     * @example
     * // Delete one PersonalInfo
     * const PersonalInfo = await prisma.personalInfo.delete({
     *   where: {
     *     // ... filter to delete one PersonalInfo
     *   }
     * })
     * 
     */
    delete<T extends PersonalInfoDeleteArgs>(args: SelectSubset<T, PersonalInfoDeleteArgs<ExtArgs>>): Prisma__PersonalInfoClient<$Result.GetResult<Prisma.$PersonalInfoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PersonalInfo.
     * @param {PersonalInfoUpdateArgs} args - Arguments to update one PersonalInfo.
     * @example
     * // Update one PersonalInfo
     * const personalInfo = await prisma.personalInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonalInfoUpdateArgs>(args: SelectSubset<T, PersonalInfoUpdateArgs<ExtArgs>>): Prisma__PersonalInfoClient<$Result.GetResult<Prisma.$PersonalInfoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PersonalInfos.
     * @param {PersonalInfoDeleteManyArgs} args - Arguments to filter PersonalInfos to delete.
     * @example
     * // Delete a few PersonalInfos
     * const { count } = await prisma.personalInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonalInfoDeleteManyArgs>(args?: SelectSubset<T, PersonalInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonalInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PersonalInfos
     * const personalInfo = await prisma.personalInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonalInfoUpdateManyArgs>(args: SelectSubset<T, PersonalInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonalInfos and returns the data updated in the database.
     * @param {PersonalInfoUpdateManyAndReturnArgs} args - Arguments to update many PersonalInfos.
     * @example
     * // Update many PersonalInfos
     * const personalInfo = await prisma.personalInfo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PersonalInfos and only return the `id`
     * const personalInfoWithIdOnly = await prisma.personalInfo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PersonalInfoUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonalInfoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalInfoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PersonalInfo.
     * @param {PersonalInfoUpsertArgs} args - Arguments to update or create a PersonalInfo.
     * @example
     * // Update or create a PersonalInfo
     * const personalInfo = await prisma.personalInfo.upsert({
     *   create: {
     *     // ... data to create a PersonalInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PersonalInfo we want to update
     *   }
     * })
     */
    upsert<T extends PersonalInfoUpsertArgs>(args: SelectSubset<T, PersonalInfoUpsertArgs<ExtArgs>>): Prisma__PersonalInfoClient<$Result.GetResult<Prisma.$PersonalInfoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PersonalInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalInfoCountArgs} args - Arguments to filter PersonalInfos to count.
     * @example
     * // Count the number of PersonalInfos
     * const count = await prisma.personalInfo.count({
     *   where: {
     *     // ... the filter for the PersonalInfos we want to count
     *   }
     * })
    **/
    count<T extends PersonalInfoCountArgs>(
      args?: Subset<T, PersonalInfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonalInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PersonalInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PersonalInfoAggregateArgs>(args: Subset<T, PersonalInfoAggregateArgs>): Prisma.PrismaPromise<GetPersonalInfoAggregateType<T>>

    /**
     * Group by PersonalInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalInfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PersonalInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonalInfoGroupByArgs['orderBy'] }
        : { orderBy?: PersonalInfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PersonalInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonalInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PersonalInfo model
   */
  readonly fields: PersonalInfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PersonalInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonalInfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PersonalInfo model
   */
  interface PersonalInfoFieldRefs {
    readonly id: FieldRef<"PersonalInfo", 'String'>
    readonly name: FieldRef<"PersonalInfo", 'String'>
    readonly fullName: FieldRef<"PersonalInfo", 'String'>
    readonly greeting: FieldRef<"PersonalInfo", 'String'>
    readonly title: FieldRef<"PersonalInfo", 'String'>
    readonly roles: FieldRef<"PersonalInfo", 'String'>
    readonly tagline: FieldRef<"PersonalInfo", 'String'>
    readonly description: FieldRef<"PersonalInfo", 'String'>
    readonly selfIntroVideo: FieldRef<"PersonalInfo", 'String'>
    readonly educationSummary: FieldRef<"PersonalInfo", 'String'>
    readonly cta: FieldRef<"PersonalInfo", 'String'>
    readonly social: FieldRef<"PersonalInfo", 'String'>
    readonly media: FieldRef<"PersonalInfo", 'String'>
    readonly updatedAt: FieldRef<"PersonalInfo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PersonalInfo findUnique
   */
  export type PersonalInfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalInfo
     */
    select?: PersonalInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalInfo
     */
    omit?: PersonalInfoOmit<ExtArgs> | null
    /**
     * Filter, which PersonalInfo to fetch.
     */
    where: PersonalInfoWhereUniqueInput
  }

  /**
   * PersonalInfo findUniqueOrThrow
   */
  export type PersonalInfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalInfo
     */
    select?: PersonalInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalInfo
     */
    omit?: PersonalInfoOmit<ExtArgs> | null
    /**
     * Filter, which PersonalInfo to fetch.
     */
    where: PersonalInfoWhereUniqueInput
  }

  /**
   * PersonalInfo findFirst
   */
  export type PersonalInfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalInfo
     */
    select?: PersonalInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalInfo
     */
    omit?: PersonalInfoOmit<ExtArgs> | null
    /**
     * Filter, which PersonalInfo to fetch.
     */
    where?: PersonalInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalInfos to fetch.
     */
    orderBy?: PersonalInfoOrderByWithRelationInput | PersonalInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonalInfos.
     */
    cursor?: PersonalInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonalInfos.
     */
    distinct?: PersonalInfoScalarFieldEnum | PersonalInfoScalarFieldEnum[]
  }

  /**
   * PersonalInfo findFirstOrThrow
   */
  export type PersonalInfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalInfo
     */
    select?: PersonalInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalInfo
     */
    omit?: PersonalInfoOmit<ExtArgs> | null
    /**
     * Filter, which PersonalInfo to fetch.
     */
    where?: PersonalInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalInfos to fetch.
     */
    orderBy?: PersonalInfoOrderByWithRelationInput | PersonalInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonalInfos.
     */
    cursor?: PersonalInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonalInfos.
     */
    distinct?: PersonalInfoScalarFieldEnum | PersonalInfoScalarFieldEnum[]
  }

  /**
   * PersonalInfo findMany
   */
  export type PersonalInfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalInfo
     */
    select?: PersonalInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalInfo
     */
    omit?: PersonalInfoOmit<ExtArgs> | null
    /**
     * Filter, which PersonalInfos to fetch.
     */
    where?: PersonalInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalInfos to fetch.
     */
    orderBy?: PersonalInfoOrderByWithRelationInput | PersonalInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PersonalInfos.
     */
    cursor?: PersonalInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonalInfos.
     */
    distinct?: PersonalInfoScalarFieldEnum | PersonalInfoScalarFieldEnum[]
  }

  /**
   * PersonalInfo create
   */
  export type PersonalInfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalInfo
     */
    select?: PersonalInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalInfo
     */
    omit?: PersonalInfoOmit<ExtArgs> | null
    /**
     * The data needed to create a PersonalInfo.
     */
    data: XOR<PersonalInfoCreateInput, PersonalInfoUncheckedCreateInput>
  }

  /**
   * PersonalInfo createMany
   */
  export type PersonalInfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PersonalInfos.
     */
    data: PersonalInfoCreateManyInput | PersonalInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PersonalInfo createManyAndReturn
   */
  export type PersonalInfoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalInfo
     */
    select?: PersonalInfoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalInfo
     */
    omit?: PersonalInfoOmit<ExtArgs> | null
    /**
     * The data used to create many PersonalInfos.
     */
    data: PersonalInfoCreateManyInput | PersonalInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PersonalInfo update
   */
  export type PersonalInfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalInfo
     */
    select?: PersonalInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalInfo
     */
    omit?: PersonalInfoOmit<ExtArgs> | null
    /**
     * The data needed to update a PersonalInfo.
     */
    data: XOR<PersonalInfoUpdateInput, PersonalInfoUncheckedUpdateInput>
    /**
     * Choose, which PersonalInfo to update.
     */
    where: PersonalInfoWhereUniqueInput
  }

  /**
   * PersonalInfo updateMany
   */
  export type PersonalInfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PersonalInfos.
     */
    data: XOR<PersonalInfoUpdateManyMutationInput, PersonalInfoUncheckedUpdateManyInput>
    /**
     * Filter which PersonalInfos to update
     */
    where?: PersonalInfoWhereInput
    /**
     * Limit how many PersonalInfos to update.
     */
    limit?: number
  }

  /**
   * PersonalInfo updateManyAndReturn
   */
  export type PersonalInfoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalInfo
     */
    select?: PersonalInfoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalInfo
     */
    omit?: PersonalInfoOmit<ExtArgs> | null
    /**
     * The data used to update PersonalInfos.
     */
    data: XOR<PersonalInfoUpdateManyMutationInput, PersonalInfoUncheckedUpdateManyInput>
    /**
     * Filter which PersonalInfos to update
     */
    where?: PersonalInfoWhereInput
    /**
     * Limit how many PersonalInfos to update.
     */
    limit?: number
  }

  /**
   * PersonalInfo upsert
   */
  export type PersonalInfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalInfo
     */
    select?: PersonalInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalInfo
     */
    omit?: PersonalInfoOmit<ExtArgs> | null
    /**
     * The filter to search for the PersonalInfo to update in case it exists.
     */
    where: PersonalInfoWhereUniqueInput
    /**
     * In case the PersonalInfo found by the `where` argument doesn't exist, create a new PersonalInfo with this data.
     */
    create: XOR<PersonalInfoCreateInput, PersonalInfoUncheckedCreateInput>
    /**
     * In case the PersonalInfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonalInfoUpdateInput, PersonalInfoUncheckedUpdateInput>
  }

  /**
   * PersonalInfo delete
   */
  export type PersonalInfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalInfo
     */
    select?: PersonalInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalInfo
     */
    omit?: PersonalInfoOmit<ExtArgs> | null
    /**
     * Filter which PersonalInfo to delete.
     */
    where: PersonalInfoWhereUniqueInput
  }

  /**
   * PersonalInfo deleteMany
   */
  export type PersonalInfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonalInfos to delete
     */
    where?: PersonalInfoWhereInput
    /**
     * Limit how many PersonalInfos to delete.
     */
    limit?: number
  }

  /**
   * PersonalInfo without action
   */
  export type PersonalInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalInfo
     */
    select?: PersonalInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalInfo
     */
    omit?: PersonalInfoOmit<ExtArgs> | null
  }


  /**
   * Model RetiredId
   */

  export type AggregateRetiredId = {
    _count: RetiredIdCountAggregateOutputType | null
    _min: RetiredIdMinAggregateOutputType | null
    _max: RetiredIdMaxAggregateOutputType | null
  }

  export type RetiredIdMinAggregateOutputType = {
    id: string | null
    entity: string | null
    retiredAt: Date | null
  }

  export type RetiredIdMaxAggregateOutputType = {
    id: string | null
    entity: string | null
    retiredAt: Date | null
  }

  export type RetiredIdCountAggregateOutputType = {
    id: number
    entity: number
    retiredAt: number
    _all: number
  }


  export type RetiredIdMinAggregateInputType = {
    id?: true
    entity?: true
    retiredAt?: true
  }

  export type RetiredIdMaxAggregateInputType = {
    id?: true
    entity?: true
    retiredAt?: true
  }

  export type RetiredIdCountAggregateInputType = {
    id?: true
    entity?: true
    retiredAt?: true
    _all?: true
  }

  export type RetiredIdAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RetiredId to aggregate.
     */
    where?: RetiredIdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RetiredIds to fetch.
     */
    orderBy?: RetiredIdOrderByWithRelationInput | RetiredIdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RetiredIdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RetiredIds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RetiredIds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RetiredIds
    **/
    _count?: true | RetiredIdCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RetiredIdMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RetiredIdMaxAggregateInputType
  }

  export type GetRetiredIdAggregateType<T extends RetiredIdAggregateArgs> = {
        [P in keyof T & keyof AggregateRetiredId]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRetiredId[P]>
      : GetScalarType<T[P], AggregateRetiredId[P]>
  }




  export type RetiredIdGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RetiredIdWhereInput
    orderBy?: RetiredIdOrderByWithAggregationInput | RetiredIdOrderByWithAggregationInput[]
    by: RetiredIdScalarFieldEnum[] | RetiredIdScalarFieldEnum
    having?: RetiredIdScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RetiredIdCountAggregateInputType | true
    _min?: RetiredIdMinAggregateInputType
    _max?: RetiredIdMaxAggregateInputType
  }

  export type RetiredIdGroupByOutputType = {
    id: string
    entity: string
    retiredAt: Date
    _count: RetiredIdCountAggregateOutputType | null
    _min: RetiredIdMinAggregateOutputType | null
    _max: RetiredIdMaxAggregateOutputType | null
  }

  type GetRetiredIdGroupByPayload<T extends RetiredIdGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RetiredIdGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RetiredIdGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RetiredIdGroupByOutputType[P]>
            : GetScalarType<T[P], RetiredIdGroupByOutputType[P]>
        }
      >
    >


  export type RetiredIdSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entity?: boolean
    retiredAt?: boolean
  }, ExtArgs["result"]["retiredId"]>

  export type RetiredIdSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entity?: boolean
    retiredAt?: boolean
  }, ExtArgs["result"]["retiredId"]>

  export type RetiredIdSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entity?: boolean
    retiredAt?: boolean
  }, ExtArgs["result"]["retiredId"]>

  export type RetiredIdSelectScalar = {
    id?: boolean
    entity?: boolean
    retiredAt?: boolean
  }

  export type RetiredIdOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "entity" | "retiredAt", ExtArgs["result"]["retiredId"]>

  export type $RetiredIdPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RetiredId"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      entity: string
      retiredAt: Date
    }, ExtArgs["result"]["retiredId"]>
    composites: {}
  }

  type RetiredIdGetPayload<S extends boolean | null | undefined | RetiredIdDefaultArgs> = $Result.GetResult<Prisma.$RetiredIdPayload, S>

  type RetiredIdCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RetiredIdFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RetiredIdCountAggregateInputType | true
    }

  export interface RetiredIdDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RetiredId'], meta: { name: 'RetiredId' } }
    /**
     * Find zero or one RetiredId that matches the filter.
     * @param {RetiredIdFindUniqueArgs} args - Arguments to find a RetiredId
     * @example
     * // Get one RetiredId
     * const retiredId = await prisma.retiredId.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RetiredIdFindUniqueArgs>(args: SelectSubset<T, RetiredIdFindUniqueArgs<ExtArgs>>): Prisma__RetiredIdClient<$Result.GetResult<Prisma.$RetiredIdPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RetiredId that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RetiredIdFindUniqueOrThrowArgs} args - Arguments to find a RetiredId
     * @example
     * // Get one RetiredId
     * const retiredId = await prisma.retiredId.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RetiredIdFindUniqueOrThrowArgs>(args: SelectSubset<T, RetiredIdFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RetiredIdClient<$Result.GetResult<Prisma.$RetiredIdPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RetiredId that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiredIdFindFirstArgs} args - Arguments to find a RetiredId
     * @example
     * // Get one RetiredId
     * const retiredId = await prisma.retiredId.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RetiredIdFindFirstArgs>(args?: SelectSubset<T, RetiredIdFindFirstArgs<ExtArgs>>): Prisma__RetiredIdClient<$Result.GetResult<Prisma.$RetiredIdPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RetiredId that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiredIdFindFirstOrThrowArgs} args - Arguments to find a RetiredId
     * @example
     * // Get one RetiredId
     * const retiredId = await prisma.retiredId.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RetiredIdFindFirstOrThrowArgs>(args?: SelectSubset<T, RetiredIdFindFirstOrThrowArgs<ExtArgs>>): Prisma__RetiredIdClient<$Result.GetResult<Prisma.$RetiredIdPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RetiredIds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiredIdFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RetiredIds
     * const retiredIds = await prisma.retiredId.findMany()
     * 
     * // Get first 10 RetiredIds
     * const retiredIds = await prisma.retiredId.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const retiredIdWithIdOnly = await prisma.retiredId.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RetiredIdFindManyArgs>(args?: SelectSubset<T, RetiredIdFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetiredIdPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RetiredId.
     * @param {RetiredIdCreateArgs} args - Arguments to create a RetiredId.
     * @example
     * // Create one RetiredId
     * const RetiredId = await prisma.retiredId.create({
     *   data: {
     *     // ... data to create a RetiredId
     *   }
     * })
     * 
     */
    create<T extends RetiredIdCreateArgs>(args: SelectSubset<T, RetiredIdCreateArgs<ExtArgs>>): Prisma__RetiredIdClient<$Result.GetResult<Prisma.$RetiredIdPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RetiredIds.
     * @param {RetiredIdCreateManyArgs} args - Arguments to create many RetiredIds.
     * @example
     * // Create many RetiredIds
     * const retiredId = await prisma.retiredId.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RetiredIdCreateManyArgs>(args?: SelectSubset<T, RetiredIdCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RetiredIds and returns the data saved in the database.
     * @param {RetiredIdCreateManyAndReturnArgs} args - Arguments to create many RetiredIds.
     * @example
     * // Create many RetiredIds
     * const retiredId = await prisma.retiredId.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RetiredIds and only return the `id`
     * const retiredIdWithIdOnly = await prisma.retiredId.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RetiredIdCreateManyAndReturnArgs>(args?: SelectSubset<T, RetiredIdCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetiredIdPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RetiredId.
     * @param {RetiredIdDeleteArgs} args - Arguments to delete one RetiredId.
     * @example
     * // Delete one RetiredId
     * const RetiredId = await prisma.retiredId.delete({
     *   where: {
     *     // ... filter to delete one RetiredId
     *   }
     * })
     * 
     */
    delete<T extends RetiredIdDeleteArgs>(args: SelectSubset<T, RetiredIdDeleteArgs<ExtArgs>>): Prisma__RetiredIdClient<$Result.GetResult<Prisma.$RetiredIdPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RetiredId.
     * @param {RetiredIdUpdateArgs} args - Arguments to update one RetiredId.
     * @example
     * // Update one RetiredId
     * const retiredId = await prisma.retiredId.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RetiredIdUpdateArgs>(args: SelectSubset<T, RetiredIdUpdateArgs<ExtArgs>>): Prisma__RetiredIdClient<$Result.GetResult<Prisma.$RetiredIdPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RetiredIds.
     * @param {RetiredIdDeleteManyArgs} args - Arguments to filter RetiredIds to delete.
     * @example
     * // Delete a few RetiredIds
     * const { count } = await prisma.retiredId.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RetiredIdDeleteManyArgs>(args?: SelectSubset<T, RetiredIdDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RetiredIds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiredIdUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RetiredIds
     * const retiredId = await prisma.retiredId.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RetiredIdUpdateManyArgs>(args: SelectSubset<T, RetiredIdUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RetiredIds and returns the data updated in the database.
     * @param {RetiredIdUpdateManyAndReturnArgs} args - Arguments to update many RetiredIds.
     * @example
     * // Update many RetiredIds
     * const retiredId = await prisma.retiredId.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RetiredIds and only return the `id`
     * const retiredIdWithIdOnly = await prisma.retiredId.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RetiredIdUpdateManyAndReturnArgs>(args: SelectSubset<T, RetiredIdUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetiredIdPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RetiredId.
     * @param {RetiredIdUpsertArgs} args - Arguments to update or create a RetiredId.
     * @example
     * // Update or create a RetiredId
     * const retiredId = await prisma.retiredId.upsert({
     *   create: {
     *     // ... data to create a RetiredId
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RetiredId we want to update
     *   }
     * })
     */
    upsert<T extends RetiredIdUpsertArgs>(args: SelectSubset<T, RetiredIdUpsertArgs<ExtArgs>>): Prisma__RetiredIdClient<$Result.GetResult<Prisma.$RetiredIdPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RetiredIds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiredIdCountArgs} args - Arguments to filter RetiredIds to count.
     * @example
     * // Count the number of RetiredIds
     * const count = await prisma.retiredId.count({
     *   where: {
     *     // ... the filter for the RetiredIds we want to count
     *   }
     * })
    **/
    count<T extends RetiredIdCountArgs>(
      args?: Subset<T, RetiredIdCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RetiredIdCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RetiredId.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiredIdAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RetiredIdAggregateArgs>(args: Subset<T, RetiredIdAggregateArgs>): Prisma.PrismaPromise<GetRetiredIdAggregateType<T>>

    /**
     * Group by RetiredId.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiredIdGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RetiredIdGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RetiredIdGroupByArgs['orderBy'] }
        : { orderBy?: RetiredIdGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RetiredIdGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRetiredIdGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RetiredId model
   */
  readonly fields: RetiredIdFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RetiredId.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RetiredIdClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RetiredId model
   */
  interface RetiredIdFieldRefs {
    readonly id: FieldRef<"RetiredId", 'String'>
    readonly entity: FieldRef<"RetiredId", 'String'>
    readonly retiredAt: FieldRef<"RetiredId", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RetiredId findUnique
   */
  export type RetiredIdFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetiredId
     */
    select?: RetiredIdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetiredId
     */
    omit?: RetiredIdOmit<ExtArgs> | null
    /**
     * Filter, which RetiredId to fetch.
     */
    where: RetiredIdWhereUniqueInput
  }

  /**
   * RetiredId findUniqueOrThrow
   */
  export type RetiredIdFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetiredId
     */
    select?: RetiredIdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetiredId
     */
    omit?: RetiredIdOmit<ExtArgs> | null
    /**
     * Filter, which RetiredId to fetch.
     */
    where: RetiredIdWhereUniqueInput
  }

  /**
   * RetiredId findFirst
   */
  export type RetiredIdFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetiredId
     */
    select?: RetiredIdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetiredId
     */
    omit?: RetiredIdOmit<ExtArgs> | null
    /**
     * Filter, which RetiredId to fetch.
     */
    where?: RetiredIdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RetiredIds to fetch.
     */
    orderBy?: RetiredIdOrderByWithRelationInput | RetiredIdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RetiredIds.
     */
    cursor?: RetiredIdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RetiredIds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RetiredIds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RetiredIds.
     */
    distinct?: RetiredIdScalarFieldEnum | RetiredIdScalarFieldEnum[]
  }

  /**
   * RetiredId findFirstOrThrow
   */
  export type RetiredIdFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetiredId
     */
    select?: RetiredIdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetiredId
     */
    omit?: RetiredIdOmit<ExtArgs> | null
    /**
     * Filter, which RetiredId to fetch.
     */
    where?: RetiredIdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RetiredIds to fetch.
     */
    orderBy?: RetiredIdOrderByWithRelationInput | RetiredIdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RetiredIds.
     */
    cursor?: RetiredIdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RetiredIds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RetiredIds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RetiredIds.
     */
    distinct?: RetiredIdScalarFieldEnum | RetiredIdScalarFieldEnum[]
  }

  /**
   * RetiredId findMany
   */
  export type RetiredIdFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetiredId
     */
    select?: RetiredIdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetiredId
     */
    omit?: RetiredIdOmit<ExtArgs> | null
    /**
     * Filter, which RetiredIds to fetch.
     */
    where?: RetiredIdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RetiredIds to fetch.
     */
    orderBy?: RetiredIdOrderByWithRelationInput | RetiredIdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RetiredIds.
     */
    cursor?: RetiredIdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RetiredIds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RetiredIds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RetiredIds.
     */
    distinct?: RetiredIdScalarFieldEnum | RetiredIdScalarFieldEnum[]
  }

  /**
   * RetiredId create
   */
  export type RetiredIdCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetiredId
     */
    select?: RetiredIdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetiredId
     */
    omit?: RetiredIdOmit<ExtArgs> | null
    /**
     * The data needed to create a RetiredId.
     */
    data: XOR<RetiredIdCreateInput, RetiredIdUncheckedCreateInput>
  }

  /**
   * RetiredId createMany
   */
  export type RetiredIdCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RetiredIds.
     */
    data: RetiredIdCreateManyInput | RetiredIdCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RetiredId createManyAndReturn
   */
  export type RetiredIdCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetiredId
     */
    select?: RetiredIdSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RetiredId
     */
    omit?: RetiredIdOmit<ExtArgs> | null
    /**
     * The data used to create many RetiredIds.
     */
    data: RetiredIdCreateManyInput | RetiredIdCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RetiredId update
   */
  export type RetiredIdUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetiredId
     */
    select?: RetiredIdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetiredId
     */
    omit?: RetiredIdOmit<ExtArgs> | null
    /**
     * The data needed to update a RetiredId.
     */
    data: XOR<RetiredIdUpdateInput, RetiredIdUncheckedUpdateInput>
    /**
     * Choose, which RetiredId to update.
     */
    where: RetiredIdWhereUniqueInput
  }

  /**
   * RetiredId updateMany
   */
  export type RetiredIdUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RetiredIds.
     */
    data: XOR<RetiredIdUpdateManyMutationInput, RetiredIdUncheckedUpdateManyInput>
    /**
     * Filter which RetiredIds to update
     */
    where?: RetiredIdWhereInput
    /**
     * Limit how many RetiredIds to update.
     */
    limit?: number
  }

  /**
   * RetiredId updateManyAndReturn
   */
  export type RetiredIdUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetiredId
     */
    select?: RetiredIdSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RetiredId
     */
    omit?: RetiredIdOmit<ExtArgs> | null
    /**
     * The data used to update RetiredIds.
     */
    data: XOR<RetiredIdUpdateManyMutationInput, RetiredIdUncheckedUpdateManyInput>
    /**
     * Filter which RetiredIds to update
     */
    where?: RetiredIdWhereInput
    /**
     * Limit how many RetiredIds to update.
     */
    limit?: number
  }

  /**
   * RetiredId upsert
   */
  export type RetiredIdUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetiredId
     */
    select?: RetiredIdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetiredId
     */
    omit?: RetiredIdOmit<ExtArgs> | null
    /**
     * The filter to search for the RetiredId to update in case it exists.
     */
    where: RetiredIdWhereUniqueInput
    /**
     * In case the RetiredId found by the `where` argument doesn't exist, create a new RetiredId with this data.
     */
    create: XOR<RetiredIdCreateInput, RetiredIdUncheckedCreateInput>
    /**
     * In case the RetiredId was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RetiredIdUpdateInput, RetiredIdUncheckedUpdateInput>
  }

  /**
   * RetiredId delete
   */
  export type RetiredIdDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetiredId
     */
    select?: RetiredIdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetiredId
     */
    omit?: RetiredIdOmit<ExtArgs> | null
    /**
     * Filter which RetiredId to delete.
     */
    where: RetiredIdWhereUniqueInput
  }

  /**
   * RetiredId deleteMany
   */
  export type RetiredIdDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RetiredIds to delete
     */
    where?: RetiredIdWhereInput
    /**
     * Limit how many RetiredIds to delete.
     */
    limit?: number
  }

  /**
   * RetiredId without action
   */
  export type RetiredIdDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetiredId
     */
    select?: RetiredIdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetiredId
     */
    omit?: RetiredIdOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    number: 'number',
    displayOrder: 'displayOrder',
    isPublished: 'isPublished',
    title: 'title',
    category: 'category',
    categories: 'categories',
    domain: 'domain',
    organization: 'organization',
    shortDescription: 'shortDescription',
    fullDescription: 'fullDescription',
    technologies: 'technologies',
    features: 'features',
    mainImage: 'mainImage',
    liveUrl: 'liveUrl',
    githubUrl: 'githubUrl',
    year: 'year',
    status: 'status',
    featured: 'featured',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectGalleryImageScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    imageUrl: 'imageUrl',
    order: 'order'
  };

  export type ProjectGalleryImageScalarFieldEnum = (typeof ProjectGalleryImageScalarFieldEnum)[keyof typeof ProjectGalleryImageScalarFieldEnum]


  export const CertificateScalarFieldEnum: {
    id: 'id',
    number: 'number',
    displayOrder: 'displayOrder',
    isPublished: 'isPublished',
    title: 'title',
    issuer: 'issuer',
    category: 'category',
    date: 'date',
    score: 'score',
    certificationTier: 'certificationTier',
    credentialId: 'credentialId',
    duration: 'duration',
    description: 'description',
    skills: 'skills',
    image: 'image',
    verificationUrl: 'verificationUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CertificateScalarFieldEnum = (typeof CertificateScalarFieldEnum)[keyof typeof CertificateScalarFieldEnum]


  export const SkillScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    proficiency: 'proficiency',
    connectedIds: 'connectedIds',
    displayOrder: 'displayOrder',
    isPublished: 'isPublished',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SkillScalarFieldEnum = (typeof SkillScalarFieldEnum)[keyof typeof SkillScalarFieldEnum]


  export const EducationScalarFieldEnum: {
    id: 'id',
    degree: 'degree',
    institution: 'institution',
    period: 'period',
    cgpa: 'cgpa',
    expectedGraduation: 'expectedGraduation',
    field: 'field',
    highlights: 'highlights',
    displayOrder: 'displayOrder',
    isPublished: 'isPublished',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EducationScalarFieldEnum = (typeof EducationScalarFieldEnum)[keyof typeof EducationScalarFieldEnum]


  export const ExperienceScalarFieldEnum: {
    id: 'id',
    organization: 'organization',
    title: 'title',
    period: 'period',
    type: 'type',
    location: 'location',
    description: 'description',
    highlights: 'highlights',
    displayOrder: 'displayOrder',
    isPublished: 'isPublished',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExperienceScalarFieldEnum = (typeof ExperienceScalarFieldEnum)[keyof typeof ExperienceScalarFieldEnum]


  export const AchievementScalarFieldEnum: {
    id: 'id',
    metric: 'metric',
    title: 'title',
    category: 'category',
    description: 'description',
    displayOrder: 'displayOrder',
    isPublished: 'isPublished',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AchievementScalarFieldEnum = (typeof AchievementScalarFieldEnum)[keyof typeof AchievementScalarFieldEnum]


  export const PersonalInfoScalarFieldEnum: {
    id: 'id',
    name: 'name',
    fullName: 'fullName',
    greeting: 'greeting',
    title: 'title',
    roles: 'roles',
    tagline: 'tagline',
    description: 'description',
    selfIntroVideo: 'selfIntroVideo',
    educationSummary: 'educationSummary',
    cta: 'cta',
    social: 'social',
    media: 'media',
    updatedAt: 'updatedAt'
  };

  export type PersonalInfoScalarFieldEnum = (typeof PersonalInfoScalarFieldEnum)[keyof typeof PersonalInfoScalarFieldEnum]


  export const RetiredIdScalarFieldEnum: {
    id: 'id',
    entity: 'entity',
    retiredAt: 'retiredAt'
  };

  export type RetiredIdScalarFieldEnum = (typeof RetiredIdScalarFieldEnum)[keyof typeof RetiredIdScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    slug?: StringFilter<"Project"> | string
    number?: StringFilter<"Project"> | string
    displayOrder?: IntFilter<"Project"> | number
    isPublished?: BoolFilter<"Project"> | boolean
    title?: StringFilter<"Project"> | string
    category?: StringFilter<"Project"> | string
    categories?: StringFilter<"Project"> | string
    domain?: StringFilter<"Project"> | string
    organization?: StringNullableFilter<"Project"> | string | null
    shortDescription?: StringFilter<"Project"> | string
    fullDescription?: StringFilter<"Project"> | string
    technologies?: StringFilter<"Project"> | string
    features?: StringFilter<"Project"> | string
    mainImage?: StringFilter<"Project"> | string
    liveUrl?: StringNullableFilter<"Project"> | string | null
    githubUrl?: StringNullableFilter<"Project"> | string | null
    year?: StringFilter<"Project"> | string
    status?: StringFilter<"Project"> | string
    featured?: BoolFilter<"Project"> | boolean
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    galleryImages?: ProjectGalleryImageListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    number?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    title?: SortOrder
    category?: SortOrder
    categories?: SortOrder
    domain?: SortOrder
    organization?: SortOrderInput | SortOrder
    shortDescription?: SortOrder
    fullDescription?: SortOrder
    technologies?: SortOrder
    features?: SortOrder
    mainImage?: SortOrder
    liveUrl?: SortOrderInput | SortOrder
    githubUrl?: SortOrderInput | SortOrder
    year?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    galleryImages?: ProjectGalleryImageOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    number?: StringFilter<"Project"> | string
    displayOrder?: IntFilter<"Project"> | number
    isPublished?: BoolFilter<"Project"> | boolean
    title?: StringFilter<"Project"> | string
    category?: StringFilter<"Project"> | string
    categories?: StringFilter<"Project"> | string
    domain?: StringFilter<"Project"> | string
    organization?: StringNullableFilter<"Project"> | string | null
    shortDescription?: StringFilter<"Project"> | string
    fullDescription?: StringFilter<"Project"> | string
    technologies?: StringFilter<"Project"> | string
    features?: StringFilter<"Project"> | string
    mainImage?: StringFilter<"Project"> | string
    liveUrl?: StringNullableFilter<"Project"> | string | null
    githubUrl?: StringNullableFilter<"Project"> | string | null
    year?: StringFilter<"Project"> | string
    status?: StringFilter<"Project"> | string
    featured?: BoolFilter<"Project"> | boolean
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    galleryImages?: ProjectGalleryImageListRelationFilter
  }, "id" | "slug">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    number?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    title?: SortOrder
    category?: SortOrder
    categories?: SortOrder
    domain?: SortOrder
    organization?: SortOrderInput | SortOrder
    shortDescription?: SortOrder
    fullDescription?: SortOrder
    technologies?: SortOrder
    features?: SortOrder
    mainImage?: SortOrder
    liveUrl?: SortOrderInput | SortOrder
    githubUrl?: SortOrderInput | SortOrder
    year?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    slug?: StringWithAggregatesFilter<"Project"> | string
    number?: StringWithAggregatesFilter<"Project"> | string
    displayOrder?: IntWithAggregatesFilter<"Project"> | number
    isPublished?: BoolWithAggregatesFilter<"Project"> | boolean
    title?: StringWithAggregatesFilter<"Project"> | string
    category?: StringWithAggregatesFilter<"Project"> | string
    categories?: StringWithAggregatesFilter<"Project"> | string
    domain?: StringWithAggregatesFilter<"Project"> | string
    organization?: StringNullableWithAggregatesFilter<"Project"> | string | null
    shortDescription?: StringWithAggregatesFilter<"Project"> | string
    fullDescription?: StringWithAggregatesFilter<"Project"> | string
    technologies?: StringWithAggregatesFilter<"Project"> | string
    features?: StringWithAggregatesFilter<"Project"> | string
    mainImage?: StringWithAggregatesFilter<"Project"> | string
    liveUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    githubUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    year?: StringWithAggregatesFilter<"Project"> | string
    status?: StringWithAggregatesFilter<"Project"> | string
    featured?: BoolWithAggregatesFilter<"Project"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ProjectGalleryImageWhereInput = {
    AND?: ProjectGalleryImageWhereInput | ProjectGalleryImageWhereInput[]
    OR?: ProjectGalleryImageWhereInput[]
    NOT?: ProjectGalleryImageWhereInput | ProjectGalleryImageWhereInput[]
    id?: StringFilter<"ProjectGalleryImage"> | string
    projectId?: StringFilter<"ProjectGalleryImage"> | string
    imageUrl?: StringFilter<"ProjectGalleryImage"> | string
    order?: IntFilter<"ProjectGalleryImage"> | number
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectGalleryImageOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    imageUrl?: SortOrder
    order?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectGalleryImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectGalleryImageWhereInput | ProjectGalleryImageWhereInput[]
    OR?: ProjectGalleryImageWhereInput[]
    NOT?: ProjectGalleryImageWhereInput | ProjectGalleryImageWhereInput[]
    projectId?: StringFilter<"ProjectGalleryImage"> | string
    imageUrl?: StringFilter<"ProjectGalleryImage"> | string
    order?: IntFilter<"ProjectGalleryImage"> | number
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ProjectGalleryImageOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    imageUrl?: SortOrder
    order?: SortOrder
    _count?: ProjectGalleryImageCountOrderByAggregateInput
    _avg?: ProjectGalleryImageAvgOrderByAggregateInput
    _max?: ProjectGalleryImageMaxOrderByAggregateInput
    _min?: ProjectGalleryImageMinOrderByAggregateInput
    _sum?: ProjectGalleryImageSumOrderByAggregateInput
  }

  export type ProjectGalleryImageScalarWhereWithAggregatesInput = {
    AND?: ProjectGalleryImageScalarWhereWithAggregatesInput | ProjectGalleryImageScalarWhereWithAggregatesInput[]
    OR?: ProjectGalleryImageScalarWhereWithAggregatesInput[]
    NOT?: ProjectGalleryImageScalarWhereWithAggregatesInput | ProjectGalleryImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectGalleryImage"> | string
    projectId?: StringWithAggregatesFilter<"ProjectGalleryImage"> | string
    imageUrl?: StringWithAggregatesFilter<"ProjectGalleryImage"> | string
    order?: IntWithAggregatesFilter<"ProjectGalleryImage"> | number
  }

  export type CertificateWhereInput = {
    AND?: CertificateWhereInput | CertificateWhereInput[]
    OR?: CertificateWhereInput[]
    NOT?: CertificateWhereInput | CertificateWhereInput[]
    id?: StringFilter<"Certificate"> | string
    number?: StringFilter<"Certificate"> | string
    displayOrder?: IntFilter<"Certificate"> | number
    isPublished?: BoolFilter<"Certificate"> | boolean
    title?: StringFilter<"Certificate"> | string
    issuer?: StringFilter<"Certificate"> | string
    category?: StringFilter<"Certificate"> | string
    date?: StringFilter<"Certificate"> | string
    score?: StringNullableFilter<"Certificate"> | string | null
    certificationTier?: StringNullableFilter<"Certificate"> | string | null
    credentialId?: StringNullableFilter<"Certificate"> | string | null
    duration?: StringNullableFilter<"Certificate"> | string | null
    description?: StringFilter<"Certificate"> | string
    skills?: StringFilter<"Certificate"> | string
    image?: StringFilter<"Certificate"> | string
    verificationUrl?: StringNullableFilter<"Certificate"> | string | null
    createdAt?: DateTimeFilter<"Certificate"> | Date | string
    updatedAt?: DateTimeFilter<"Certificate"> | Date | string
  }

  export type CertificateOrderByWithRelationInput = {
    id?: SortOrder
    number?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    title?: SortOrder
    issuer?: SortOrder
    category?: SortOrder
    date?: SortOrder
    score?: SortOrderInput | SortOrder
    certificationTier?: SortOrderInput | SortOrder
    credentialId?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    description?: SortOrder
    skills?: SortOrder
    image?: SortOrder
    verificationUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CertificateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CertificateWhereInput | CertificateWhereInput[]
    OR?: CertificateWhereInput[]
    NOT?: CertificateWhereInput | CertificateWhereInput[]
    number?: StringFilter<"Certificate"> | string
    displayOrder?: IntFilter<"Certificate"> | number
    isPublished?: BoolFilter<"Certificate"> | boolean
    title?: StringFilter<"Certificate"> | string
    issuer?: StringFilter<"Certificate"> | string
    category?: StringFilter<"Certificate"> | string
    date?: StringFilter<"Certificate"> | string
    score?: StringNullableFilter<"Certificate"> | string | null
    certificationTier?: StringNullableFilter<"Certificate"> | string | null
    credentialId?: StringNullableFilter<"Certificate"> | string | null
    duration?: StringNullableFilter<"Certificate"> | string | null
    description?: StringFilter<"Certificate"> | string
    skills?: StringFilter<"Certificate"> | string
    image?: StringFilter<"Certificate"> | string
    verificationUrl?: StringNullableFilter<"Certificate"> | string | null
    createdAt?: DateTimeFilter<"Certificate"> | Date | string
    updatedAt?: DateTimeFilter<"Certificate"> | Date | string
  }, "id">

  export type CertificateOrderByWithAggregationInput = {
    id?: SortOrder
    number?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    title?: SortOrder
    issuer?: SortOrder
    category?: SortOrder
    date?: SortOrder
    score?: SortOrderInput | SortOrder
    certificationTier?: SortOrderInput | SortOrder
    credentialId?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    description?: SortOrder
    skills?: SortOrder
    image?: SortOrder
    verificationUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CertificateCountOrderByAggregateInput
    _avg?: CertificateAvgOrderByAggregateInput
    _max?: CertificateMaxOrderByAggregateInput
    _min?: CertificateMinOrderByAggregateInput
    _sum?: CertificateSumOrderByAggregateInput
  }

  export type CertificateScalarWhereWithAggregatesInput = {
    AND?: CertificateScalarWhereWithAggregatesInput | CertificateScalarWhereWithAggregatesInput[]
    OR?: CertificateScalarWhereWithAggregatesInput[]
    NOT?: CertificateScalarWhereWithAggregatesInput | CertificateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Certificate"> | string
    number?: StringWithAggregatesFilter<"Certificate"> | string
    displayOrder?: IntWithAggregatesFilter<"Certificate"> | number
    isPublished?: BoolWithAggregatesFilter<"Certificate"> | boolean
    title?: StringWithAggregatesFilter<"Certificate"> | string
    issuer?: StringWithAggregatesFilter<"Certificate"> | string
    category?: StringWithAggregatesFilter<"Certificate"> | string
    date?: StringWithAggregatesFilter<"Certificate"> | string
    score?: StringNullableWithAggregatesFilter<"Certificate"> | string | null
    certificationTier?: StringNullableWithAggregatesFilter<"Certificate"> | string | null
    credentialId?: StringNullableWithAggregatesFilter<"Certificate"> | string | null
    duration?: StringNullableWithAggregatesFilter<"Certificate"> | string | null
    description?: StringWithAggregatesFilter<"Certificate"> | string
    skills?: StringWithAggregatesFilter<"Certificate"> | string
    image?: StringWithAggregatesFilter<"Certificate"> | string
    verificationUrl?: StringNullableWithAggregatesFilter<"Certificate"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Certificate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Certificate"> | Date | string
  }

  export type SkillWhereInput = {
    AND?: SkillWhereInput | SkillWhereInput[]
    OR?: SkillWhereInput[]
    NOT?: SkillWhereInput | SkillWhereInput[]
    id?: StringFilter<"Skill"> | string
    name?: StringFilter<"Skill"> | string
    category?: StringFilter<"Skill"> | string
    proficiency?: IntFilter<"Skill"> | number
    connectedIds?: StringFilter<"Skill"> | string
    displayOrder?: IntFilter<"Skill"> | number
    isPublished?: BoolFilter<"Skill"> | boolean
    createdAt?: DateTimeFilter<"Skill"> | Date | string
    updatedAt?: DateTimeFilter<"Skill"> | Date | string
  }

  export type SkillOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    proficiency?: SortOrder
    connectedIds?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SkillWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SkillWhereInput | SkillWhereInput[]
    OR?: SkillWhereInput[]
    NOT?: SkillWhereInput | SkillWhereInput[]
    name?: StringFilter<"Skill"> | string
    category?: StringFilter<"Skill"> | string
    proficiency?: IntFilter<"Skill"> | number
    connectedIds?: StringFilter<"Skill"> | string
    displayOrder?: IntFilter<"Skill"> | number
    isPublished?: BoolFilter<"Skill"> | boolean
    createdAt?: DateTimeFilter<"Skill"> | Date | string
    updatedAt?: DateTimeFilter<"Skill"> | Date | string
  }, "id">

  export type SkillOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    proficiency?: SortOrder
    connectedIds?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SkillCountOrderByAggregateInput
    _avg?: SkillAvgOrderByAggregateInput
    _max?: SkillMaxOrderByAggregateInput
    _min?: SkillMinOrderByAggregateInput
    _sum?: SkillSumOrderByAggregateInput
  }

  export type SkillScalarWhereWithAggregatesInput = {
    AND?: SkillScalarWhereWithAggregatesInput | SkillScalarWhereWithAggregatesInput[]
    OR?: SkillScalarWhereWithAggregatesInput[]
    NOT?: SkillScalarWhereWithAggregatesInput | SkillScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Skill"> | string
    name?: StringWithAggregatesFilter<"Skill"> | string
    category?: StringWithAggregatesFilter<"Skill"> | string
    proficiency?: IntWithAggregatesFilter<"Skill"> | number
    connectedIds?: StringWithAggregatesFilter<"Skill"> | string
    displayOrder?: IntWithAggregatesFilter<"Skill"> | number
    isPublished?: BoolWithAggregatesFilter<"Skill"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Skill"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Skill"> | Date | string
  }

  export type EducationWhereInput = {
    AND?: EducationWhereInput | EducationWhereInput[]
    OR?: EducationWhereInput[]
    NOT?: EducationWhereInput | EducationWhereInput[]
    id?: StringFilter<"Education"> | string
    degree?: StringFilter<"Education"> | string
    institution?: StringFilter<"Education"> | string
    period?: StringFilter<"Education"> | string
    cgpa?: StringFilter<"Education"> | string
    expectedGraduation?: StringFilter<"Education"> | string
    field?: StringFilter<"Education"> | string
    highlights?: StringFilter<"Education"> | string
    displayOrder?: IntFilter<"Education"> | number
    isPublished?: BoolFilter<"Education"> | boolean
    createdAt?: DateTimeFilter<"Education"> | Date | string
    updatedAt?: DateTimeFilter<"Education"> | Date | string
  }

  export type EducationOrderByWithRelationInput = {
    id?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    period?: SortOrder
    cgpa?: SortOrder
    expectedGraduation?: SortOrder
    field?: SortOrder
    highlights?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EducationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EducationWhereInput | EducationWhereInput[]
    OR?: EducationWhereInput[]
    NOT?: EducationWhereInput | EducationWhereInput[]
    degree?: StringFilter<"Education"> | string
    institution?: StringFilter<"Education"> | string
    period?: StringFilter<"Education"> | string
    cgpa?: StringFilter<"Education"> | string
    expectedGraduation?: StringFilter<"Education"> | string
    field?: StringFilter<"Education"> | string
    highlights?: StringFilter<"Education"> | string
    displayOrder?: IntFilter<"Education"> | number
    isPublished?: BoolFilter<"Education"> | boolean
    createdAt?: DateTimeFilter<"Education"> | Date | string
    updatedAt?: DateTimeFilter<"Education"> | Date | string
  }, "id">

  export type EducationOrderByWithAggregationInput = {
    id?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    period?: SortOrder
    cgpa?: SortOrder
    expectedGraduation?: SortOrder
    field?: SortOrder
    highlights?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EducationCountOrderByAggregateInput
    _avg?: EducationAvgOrderByAggregateInput
    _max?: EducationMaxOrderByAggregateInput
    _min?: EducationMinOrderByAggregateInput
    _sum?: EducationSumOrderByAggregateInput
  }

  export type EducationScalarWhereWithAggregatesInput = {
    AND?: EducationScalarWhereWithAggregatesInput | EducationScalarWhereWithAggregatesInput[]
    OR?: EducationScalarWhereWithAggregatesInput[]
    NOT?: EducationScalarWhereWithAggregatesInput | EducationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Education"> | string
    degree?: StringWithAggregatesFilter<"Education"> | string
    institution?: StringWithAggregatesFilter<"Education"> | string
    period?: StringWithAggregatesFilter<"Education"> | string
    cgpa?: StringWithAggregatesFilter<"Education"> | string
    expectedGraduation?: StringWithAggregatesFilter<"Education"> | string
    field?: StringWithAggregatesFilter<"Education"> | string
    highlights?: StringWithAggregatesFilter<"Education"> | string
    displayOrder?: IntWithAggregatesFilter<"Education"> | number
    isPublished?: BoolWithAggregatesFilter<"Education"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Education"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Education"> | Date | string
  }

  export type ExperienceWhereInput = {
    AND?: ExperienceWhereInput | ExperienceWhereInput[]
    OR?: ExperienceWhereInput[]
    NOT?: ExperienceWhereInput | ExperienceWhereInput[]
    id?: StringFilter<"Experience"> | string
    organization?: StringFilter<"Experience"> | string
    title?: StringFilter<"Experience"> | string
    period?: StringFilter<"Experience"> | string
    type?: StringFilter<"Experience"> | string
    location?: StringFilter<"Experience"> | string
    description?: StringFilter<"Experience"> | string
    highlights?: StringFilter<"Experience"> | string
    displayOrder?: IntFilter<"Experience"> | number
    isPublished?: BoolFilter<"Experience"> | boolean
    createdAt?: DateTimeFilter<"Experience"> | Date | string
    updatedAt?: DateTimeFilter<"Experience"> | Date | string
  }

  export type ExperienceOrderByWithRelationInput = {
    id?: SortOrder
    organization?: SortOrder
    title?: SortOrder
    period?: SortOrder
    type?: SortOrder
    location?: SortOrder
    description?: SortOrder
    highlights?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExperienceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExperienceWhereInput | ExperienceWhereInput[]
    OR?: ExperienceWhereInput[]
    NOT?: ExperienceWhereInput | ExperienceWhereInput[]
    organization?: StringFilter<"Experience"> | string
    title?: StringFilter<"Experience"> | string
    period?: StringFilter<"Experience"> | string
    type?: StringFilter<"Experience"> | string
    location?: StringFilter<"Experience"> | string
    description?: StringFilter<"Experience"> | string
    highlights?: StringFilter<"Experience"> | string
    displayOrder?: IntFilter<"Experience"> | number
    isPublished?: BoolFilter<"Experience"> | boolean
    createdAt?: DateTimeFilter<"Experience"> | Date | string
    updatedAt?: DateTimeFilter<"Experience"> | Date | string
  }, "id">

  export type ExperienceOrderByWithAggregationInput = {
    id?: SortOrder
    organization?: SortOrder
    title?: SortOrder
    period?: SortOrder
    type?: SortOrder
    location?: SortOrder
    description?: SortOrder
    highlights?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExperienceCountOrderByAggregateInput
    _avg?: ExperienceAvgOrderByAggregateInput
    _max?: ExperienceMaxOrderByAggregateInput
    _min?: ExperienceMinOrderByAggregateInput
    _sum?: ExperienceSumOrderByAggregateInput
  }

  export type ExperienceScalarWhereWithAggregatesInput = {
    AND?: ExperienceScalarWhereWithAggregatesInput | ExperienceScalarWhereWithAggregatesInput[]
    OR?: ExperienceScalarWhereWithAggregatesInput[]
    NOT?: ExperienceScalarWhereWithAggregatesInput | ExperienceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Experience"> | string
    organization?: StringWithAggregatesFilter<"Experience"> | string
    title?: StringWithAggregatesFilter<"Experience"> | string
    period?: StringWithAggregatesFilter<"Experience"> | string
    type?: StringWithAggregatesFilter<"Experience"> | string
    location?: StringWithAggregatesFilter<"Experience"> | string
    description?: StringWithAggregatesFilter<"Experience"> | string
    highlights?: StringWithAggregatesFilter<"Experience"> | string
    displayOrder?: IntWithAggregatesFilter<"Experience"> | number
    isPublished?: BoolWithAggregatesFilter<"Experience"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Experience"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Experience"> | Date | string
  }

  export type AchievementWhereInput = {
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    id?: StringFilter<"Achievement"> | string
    metric?: StringFilter<"Achievement"> | string
    title?: StringFilter<"Achievement"> | string
    category?: StringFilter<"Achievement"> | string
    description?: StringFilter<"Achievement"> | string
    displayOrder?: IntFilter<"Achievement"> | number
    isPublished?: BoolFilter<"Achievement"> | boolean
    createdAt?: DateTimeFilter<"Achievement"> | Date | string
    updatedAt?: DateTimeFilter<"Achievement"> | Date | string
  }

  export type AchievementOrderByWithRelationInput = {
    id?: SortOrder
    metric?: SortOrder
    title?: SortOrder
    category?: SortOrder
    description?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AchievementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    metric?: StringFilter<"Achievement"> | string
    title?: StringFilter<"Achievement"> | string
    category?: StringFilter<"Achievement"> | string
    description?: StringFilter<"Achievement"> | string
    displayOrder?: IntFilter<"Achievement"> | number
    isPublished?: BoolFilter<"Achievement"> | boolean
    createdAt?: DateTimeFilter<"Achievement"> | Date | string
    updatedAt?: DateTimeFilter<"Achievement"> | Date | string
  }, "id">

  export type AchievementOrderByWithAggregationInput = {
    id?: SortOrder
    metric?: SortOrder
    title?: SortOrder
    category?: SortOrder
    description?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AchievementCountOrderByAggregateInput
    _avg?: AchievementAvgOrderByAggregateInput
    _max?: AchievementMaxOrderByAggregateInput
    _min?: AchievementMinOrderByAggregateInput
    _sum?: AchievementSumOrderByAggregateInput
  }

  export type AchievementScalarWhereWithAggregatesInput = {
    AND?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    OR?: AchievementScalarWhereWithAggregatesInput[]
    NOT?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Achievement"> | string
    metric?: StringWithAggregatesFilter<"Achievement"> | string
    title?: StringWithAggregatesFilter<"Achievement"> | string
    category?: StringWithAggregatesFilter<"Achievement"> | string
    description?: StringWithAggregatesFilter<"Achievement"> | string
    displayOrder?: IntWithAggregatesFilter<"Achievement"> | number
    isPublished?: BoolWithAggregatesFilter<"Achievement"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Achievement"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Achievement"> | Date | string
  }

  export type PersonalInfoWhereInput = {
    AND?: PersonalInfoWhereInput | PersonalInfoWhereInput[]
    OR?: PersonalInfoWhereInput[]
    NOT?: PersonalInfoWhereInput | PersonalInfoWhereInput[]
    id?: StringFilter<"PersonalInfo"> | string
    name?: StringFilter<"PersonalInfo"> | string
    fullName?: StringFilter<"PersonalInfo"> | string
    greeting?: StringFilter<"PersonalInfo"> | string
    title?: StringFilter<"PersonalInfo"> | string
    roles?: StringFilter<"PersonalInfo"> | string
    tagline?: StringFilter<"PersonalInfo"> | string
    description?: StringFilter<"PersonalInfo"> | string
    selfIntroVideo?: StringFilter<"PersonalInfo"> | string
    educationSummary?: StringFilter<"PersonalInfo"> | string
    cta?: StringFilter<"PersonalInfo"> | string
    social?: StringFilter<"PersonalInfo"> | string
    media?: StringFilter<"PersonalInfo"> | string
    updatedAt?: DateTimeFilter<"PersonalInfo"> | Date | string
  }

  export type PersonalInfoOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    greeting?: SortOrder
    title?: SortOrder
    roles?: SortOrder
    tagline?: SortOrder
    description?: SortOrder
    selfIntroVideo?: SortOrder
    educationSummary?: SortOrder
    cta?: SortOrder
    social?: SortOrder
    media?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonalInfoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PersonalInfoWhereInput | PersonalInfoWhereInput[]
    OR?: PersonalInfoWhereInput[]
    NOT?: PersonalInfoWhereInput | PersonalInfoWhereInput[]
    name?: StringFilter<"PersonalInfo"> | string
    fullName?: StringFilter<"PersonalInfo"> | string
    greeting?: StringFilter<"PersonalInfo"> | string
    title?: StringFilter<"PersonalInfo"> | string
    roles?: StringFilter<"PersonalInfo"> | string
    tagline?: StringFilter<"PersonalInfo"> | string
    description?: StringFilter<"PersonalInfo"> | string
    selfIntroVideo?: StringFilter<"PersonalInfo"> | string
    educationSummary?: StringFilter<"PersonalInfo"> | string
    cta?: StringFilter<"PersonalInfo"> | string
    social?: StringFilter<"PersonalInfo"> | string
    media?: StringFilter<"PersonalInfo"> | string
    updatedAt?: DateTimeFilter<"PersonalInfo"> | Date | string
  }, "id">

  export type PersonalInfoOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    greeting?: SortOrder
    title?: SortOrder
    roles?: SortOrder
    tagline?: SortOrder
    description?: SortOrder
    selfIntroVideo?: SortOrder
    educationSummary?: SortOrder
    cta?: SortOrder
    social?: SortOrder
    media?: SortOrder
    updatedAt?: SortOrder
    _count?: PersonalInfoCountOrderByAggregateInput
    _max?: PersonalInfoMaxOrderByAggregateInput
    _min?: PersonalInfoMinOrderByAggregateInput
  }

  export type PersonalInfoScalarWhereWithAggregatesInput = {
    AND?: PersonalInfoScalarWhereWithAggregatesInput | PersonalInfoScalarWhereWithAggregatesInput[]
    OR?: PersonalInfoScalarWhereWithAggregatesInput[]
    NOT?: PersonalInfoScalarWhereWithAggregatesInput | PersonalInfoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PersonalInfo"> | string
    name?: StringWithAggregatesFilter<"PersonalInfo"> | string
    fullName?: StringWithAggregatesFilter<"PersonalInfo"> | string
    greeting?: StringWithAggregatesFilter<"PersonalInfo"> | string
    title?: StringWithAggregatesFilter<"PersonalInfo"> | string
    roles?: StringWithAggregatesFilter<"PersonalInfo"> | string
    tagline?: StringWithAggregatesFilter<"PersonalInfo"> | string
    description?: StringWithAggregatesFilter<"PersonalInfo"> | string
    selfIntroVideo?: StringWithAggregatesFilter<"PersonalInfo"> | string
    educationSummary?: StringWithAggregatesFilter<"PersonalInfo"> | string
    cta?: StringWithAggregatesFilter<"PersonalInfo"> | string
    social?: StringWithAggregatesFilter<"PersonalInfo"> | string
    media?: StringWithAggregatesFilter<"PersonalInfo"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"PersonalInfo"> | Date | string
  }

  export type RetiredIdWhereInput = {
    AND?: RetiredIdWhereInput | RetiredIdWhereInput[]
    OR?: RetiredIdWhereInput[]
    NOT?: RetiredIdWhereInput | RetiredIdWhereInput[]
    id?: StringFilter<"RetiredId"> | string
    entity?: StringFilter<"RetiredId"> | string
    retiredAt?: DateTimeFilter<"RetiredId"> | Date | string
  }

  export type RetiredIdOrderByWithRelationInput = {
    id?: SortOrder
    entity?: SortOrder
    retiredAt?: SortOrder
  }

  export type RetiredIdWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RetiredIdWhereInput | RetiredIdWhereInput[]
    OR?: RetiredIdWhereInput[]
    NOT?: RetiredIdWhereInput | RetiredIdWhereInput[]
    entity?: StringFilter<"RetiredId"> | string
    retiredAt?: DateTimeFilter<"RetiredId"> | Date | string
  }, "id">

  export type RetiredIdOrderByWithAggregationInput = {
    id?: SortOrder
    entity?: SortOrder
    retiredAt?: SortOrder
    _count?: RetiredIdCountOrderByAggregateInput
    _max?: RetiredIdMaxOrderByAggregateInput
    _min?: RetiredIdMinOrderByAggregateInput
  }

  export type RetiredIdScalarWhereWithAggregatesInput = {
    AND?: RetiredIdScalarWhereWithAggregatesInput | RetiredIdScalarWhereWithAggregatesInput[]
    OR?: RetiredIdScalarWhereWithAggregatesInput[]
    NOT?: RetiredIdScalarWhereWithAggregatesInput | RetiredIdScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RetiredId"> | string
    entity?: StringWithAggregatesFilter<"RetiredId"> | string
    retiredAt?: DateTimeWithAggregatesFilter<"RetiredId"> | Date | string
  }

  export type ProjectCreateInput = {
    id: string
    slug: string
    number?: string
    displayOrder?: number
    isPublished?: boolean
    title: string
    category: string
    categories: string
    domain: string
    organization?: string | null
    shortDescription: string
    fullDescription: string
    technologies: string
    features: string
    mainImage: string
    liveUrl?: string | null
    githubUrl?: string | null
    year: string
    status: string
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    galleryImages?: ProjectGalleryImageCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id: string
    slug: string
    number?: string
    displayOrder?: number
    isPublished?: boolean
    title: string
    category: string
    categories: string
    domain: string
    organization?: string | null
    shortDescription: string
    fullDescription: string
    technologies: string
    features: string
    mainImage: string
    liveUrl?: string | null
    githubUrl?: string | null
    year: string
    status: string
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    galleryImages?: ProjectGalleryImageUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: StringFieldUpdateOperationsInput | string
    fullDescription?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    mainImage?: StringFieldUpdateOperationsInput | string
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    galleryImages?: ProjectGalleryImageUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: StringFieldUpdateOperationsInput | string
    fullDescription?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    mainImage?: StringFieldUpdateOperationsInput | string
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    galleryImages?: ProjectGalleryImageUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id: string
    slug: string
    number?: string
    displayOrder?: number
    isPublished?: boolean
    title: string
    category: string
    categories: string
    domain: string
    organization?: string | null
    shortDescription: string
    fullDescription: string
    technologies: string
    features: string
    mainImage: string
    liveUrl?: string | null
    githubUrl?: string | null
    year: string
    status: string
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: StringFieldUpdateOperationsInput | string
    fullDescription?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    mainImage?: StringFieldUpdateOperationsInput | string
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: StringFieldUpdateOperationsInput | string
    fullDescription?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    mainImage?: StringFieldUpdateOperationsInput | string
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectGalleryImageCreateInput = {
    id?: string
    imageUrl: string
    order?: number
    project: ProjectCreateNestedOneWithoutGalleryImagesInput
  }

  export type ProjectGalleryImageUncheckedCreateInput = {
    id?: string
    projectId: string
    imageUrl: string
    order?: number
  }

  export type ProjectGalleryImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    project?: ProjectUpdateOneRequiredWithoutGalleryImagesNestedInput
  }

  export type ProjectGalleryImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProjectGalleryImageCreateManyInput = {
    id?: string
    projectId: string
    imageUrl: string
    order?: number
  }

  export type ProjectGalleryImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProjectGalleryImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type CertificateCreateInput = {
    id: string
    number?: string
    displayOrder?: number
    isPublished?: boolean
    title: string
    issuer: string
    category: string
    date: string
    score?: string | null
    certificationTier?: string | null
    credentialId?: string | null
    duration?: string | null
    description: string
    skills: string
    image: string
    verificationUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateUncheckedCreateInput = {
    id: string
    number?: string
    displayOrder?: number
    isPublished?: boolean
    title: string
    issuer: string
    category: string
    date: string
    score?: string | null
    certificationTier?: string | null
    credentialId?: string | null
    duration?: string | null
    description: string
    skills: string
    image: string
    verificationUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    score?: NullableStringFieldUpdateOperationsInput | string | null
    certificationTier?: NullableStringFieldUpdateOperationsInput | string | null
    credentialId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    skills?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    verificationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    score?: NullableStringFieldUpdateOperationsInput | string | null
    certificationTier?: NullableStringFieldUpdateOperationsInput | string | null
    credentialId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    skills?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    verificationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateCreateManyInput = {
    id: string
    number?: string
    displayOrder?: number
    isPublished?: boolean
    title: string
    issuer: string
    category: string
    date: string
    score?: string | null
    certificationTier?: string | null
    credentialId?: string | null
    duration?: string | null
    description: string
    skills: string
    image: string
    verificationUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    score?: NullableStringFieldUpdateOperationsInput | string | null
    certificationTier?: NullableStringFieldUpdateOperationsInput | string | null
    credentialId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    skills?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    verificationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    score?: NullableStringFieldUpdateOperationsInput | string | null
    certificationTier?: NullableStringFieldUpdateOperationsInput | string | null
    credentialId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    skills?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    verificationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillCreateInput = {
    id: string
    name: string
    category: string
    proficiency: number
    connectedIds: string
    displayOrder?: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SkillUncheckedCreateInput = {
    id: string
    name: string
    category: string
    proficiency: number
    connectedIds: string
    displayOrder?: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SkillUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    proficiency?: IntFieldUpdateOperationsInput | number
    connectedIds?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    proficiency?: IntFieldUpdateOperationsInput | number
    connectedIds?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillCreateManyInput = {
    id: string
    name: string
    category: string
    proficiency: number
    connectedIds: string
    displayOrder?: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SkillUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    proficiency?: IntFieldUpdateOperationsInput | number
    connectedIds?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    proficiency?: IntFieldUpdateOperationsInput | number
    connectedIds?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationCreateInput = {
    id: string
    degree: string
    institution: string
    period: string
    cgpa: string
    expectedGraduation: string
    field: string
    highlights: string
    displayOrder?: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EducationUncheckedCreateInput = {
    id: string
    degree: string
    institution: string
    period: string
    cgpa: string
    expectedGraduation: string
    field: string
    highlights: string
    displayOrder?: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EducationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    cgpa?: StringFieldUpdateOperationsInput | string
    expectedGraduation?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    highlights?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    cgpa?: StringFieldUpdateOperationsInput | string
    expectedGraduation?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    highlights?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationCreateManyInput = {
    id: string
    degree: string
    institution: string
    period: string
    cgpa: string
    expectedGraduation: string
    field: string
    highlights: string
    displayOrder?: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EducationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    cgpa?: StringFieldUpdateOperationsInput | string
    expectedGraduation?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    highlights?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    cgpa?: StringFieldUpdateOperationsInput | string
    expectedGraduation?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    highlights?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperienceCreateInput = {
    id: string
    organization: string
    title: string
    period: string
    type: string
    location: string
    description: string
    highlights: string
    displayOrder?: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExperienceUncheckedCreateInput = {
    id: string
    organization: string
    title: string
    period: string
    type: string
    location: string
    description: string
    highlights: string
    displayOrder?: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExperienceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    highlights?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperienceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    highlights?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperienceCreateManyInput = {
    id: string
    organization: string
    title: string
    period: string
    type: string
    location: string
    description: string
    highlights: string
    displayOrder?: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExperienceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    highlights?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperienceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    highlights?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementCreateInput = {
    id: string
    metric: string
    title: string
    category: string
    description: string
    displayOrder?: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AchievementUncheckedCreateInput = {
    id: string
    metric: string
    title: string
    category: string
    description: string
    displayOrder?: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AchievementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    metric?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    metric?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementCreateManyInput = {
    id: string
    metric: string
    title: string
    category: string
    description: string
    displayOrder?: number
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AchievementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    metric?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    metric?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalInfoCreateInput = {
    id?: string
    name: string
    fullName: string
    greeting: string
    title: string
    roles: string
    tagline: string
    description: string
    selfIntroVideo: string
    educationSummary: string
    cta: string
    social: string
    media: string
    updatedAt?: Date | string
  }

  export type PersonalInfoUncheckedCreateInput = {
    id?: string
    name: string
    fullName: string
    greeting: string
    title: string
    roles: string
    tagline: string
    description: string
    selfIntroVideo: string
    educationSummary: string
    cta: string
    social: string
    media: string
    updatedAt?: Date | string
  }

  export type PersonalInfoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    greeting?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    selfIntroVideo?: StringFieldUpdateOperationsInput | string
    educationSummary?: StringFieldUpdateOperationsInput | string
    cta?: StringFieldUpdateOperationsInput | string
    social?: StringFieldUpdateOperationsInput | string
    media?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalInfoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    greeting?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    selfIntroVideo?: StringFieldUpdateOperationsInput | string
    educationSummary?: StringFieldUpdateOperationsInput | string
    cta?: StringFieldUpdateOperationsInput | string
    social?: StringFieldUpdateOperationsInput | string
    media?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalInfoCreateManyInput = {
    id?: string
    name: string
    fullName: string
    greeting: string
    title: string
    roles: string
    tagline: string
    description: string
    selfIntroVideo: string
    educationSummary: string
    cta: string
    social: string
    media: string
    updatedAt?: Date | string
  }

  export type PersonalInfoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    greeting?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    selfIntroVideo?: StringFieldUpdateOperationsInput | string
    educationSummary?: StringFieldUpdateOperationsInput | string
    cta?: StringFieldUpdateOperationsInput | string
    social?: StringFieldUpdateOperationsInput | string
    media?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalInfoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    greeting?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    selfIntroVideo?: StringFieldUpdateOperationsInput | string
    educationSummary?: StringFieldUpdateOperationsInput | string
    cta?: StringFieldUpdateOperationsInput | string
    social?: StringFieldUpdateOperationsInput | string
    media?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetiredIdCreateInput = {
    id: string
    entity: string
    retiredAt?: Date | string
  }

  export type RetiredIdUncheckedCreateInput = {
    id: string
    entity: string
    retiredAt?: Date | string
  }

  export type RetiredIdUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    retiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetiredIdUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    retiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetiredIdCreateManyInput = {
    id: string
    entity: string
    retiredAt?: Date | string
  }

  export type RetiredIdUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    retiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetiredIdUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    retiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProjectGalleryImageListRelationFilter = {
    every?: ProjectGalleryImageWhereInput
    some?: ProjectGalleryImageWhereInput
    none?: ProjectGalleryImageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectGalleryImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    number?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    title?: SortOrder
    category?: SortOrder
    categories?: SortOrder
    domain?: SortOrder
    organization?: SortOrder
    shortDescription?: SortOrder
    fullDescription?: SortOrder
    technologies?: SortOrder
    features?: SortOrder
    mainImage?: SortOrder
    liveUrl?: SortOrder
    githubUrl?: SortOrder
    year?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    number?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    title?: SortOrder
    category?: SortOrder
    categories?: SortOrder
    domain?: SortOrder
    organization?: SortOrder
    shortDescription?: SortOrder
    fullDescription?: SortOrder
    technologies?: SortOrder
    features?: SortOrder
    mainImage?: SortOrder
    liveUrl?: SortOrder
    githubUrl?: SortOrder
    year?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    number?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    title?: SortOrder
    category?: SortOrder
    categories?: SortOrder
    domain?: SortOrder
    organization?: SortOrder
    shortDescription?: SortOrder
    fullDescription?: SortOrder
    technologies?: SortOrder
    features?: SortOrder
    mainImage?: SortOrder
    liveUrl?: SortOrder
    githubUrl?: SortOrder
    year?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ProjectGalleryImageCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    imageUrl?: SortOrder
    order?: SortOrder
  }

  export type ProjectGalleryImageAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ProjectGalleryImageMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    imageUrl?: SortOrder
    order?: SortOrder
  }

  export type ProjectGalleryImageMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    imageUrl?: SortOrder
    order?: SortOrder
  }

  export type ProjectGalleryImageSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type CertificateCountOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    title?: SortOrder
    issuer?: SortOrder
    category?: SortOrder
    date?: SortOrder
    score?: SortOrder
    certificationTier?: SortOrder
    credentialId?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    skills?: SortOrder
    image?: SortOrder
    verificationUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CertificateAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type CertificateMaxOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    title?: SortOrder
    issuer?: SortOrder
    category?: SortOrder
    date?: SortOrder
    score?: SortOrder
    certificationTier?: SortOrder
    credentialId?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    skills?: SortOrder
    image?: SortOrder
    verificationUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CertificateMinOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    title?: SortOrder
    issuer?: SortOrder
    category?: SortOrder
    date?: SortOrder
    score?: SortOrder
    certificationTier?: SortOrder
    credentialId?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    skills?: SortOrder
    image?: SortOrder
    verificationUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CertificateSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type SkillCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    proficiency?: SortOrder
    connectedIds?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SkillAvgOrderByAggregateInput = {
    proficiency?: SortOrder
    displayOrder?: SortOrder
  }

  export type SkillMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    proficiency?: SortOrder
    connectedIds?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SkillMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    proficiency?: SortOrder
    connectedIds?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SkillSumOrderByAggregateInput = {
    proficiency?: SortOrder
    displayOrder?: SortOrder
  }

  export type EducationCountOrderByAggregateInput = {
    id?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    period?: SortOrder
    cgpa?: SortOrder
    expectedGraduation?: SortOrder
    field?: SortOrder
    highlights?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EducationAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type EducationMaxOrderByAggregateInput = {
    id?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    period?: SortOrder
    cgpa?: SortOrder
    expectedGraduation?: SortOrder
    field?: SortOrder
    highlights?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EducationMinOrderByAggregateInput = {
    id?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    period?: SortOrder
    cgpa?: SortOrder
    expectedGraduation?: SortOrder
    field?: SortOrder
    highlights?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EducationSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type ExperienceCountOrderByAggregateInput = {
    id?: SortOrder
    organization?: SortOrder
    title?: SortOrder
    period?: SortOrder
    type?: SortOrder
    location?: SortOrder
    description?: SortOrder
    highlights?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExperienceAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type ExperienceMaxOrderByAggregateInput = {
    id?: SortOrder
    organization?: SortOrder
    title?: SortOrder
    period?: SortOrder
    type?: SortOrder
    location?: SortOrder
    description?: SortOrder
    highlights?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExperienceMinOrderByAggregateInput = {
    id?: SortOrder
    organization?: SortOrder
    title?: SortOrder
    period?: SortOrder
    type?: SortOrder
    location?: SortOrder
    description?: SortOrder
    highlights?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExperienceSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type AchievementCountOrderByAggregateInput = {
    id?: SortOrder
    metric?: SortOrder
    title?: SortOrder
    category?: SortOrder
    description?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AchievementAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type AchievementMaxOrderByAggregateInput = {
    id?: SortOrder
    metric?: SortOrder
    title?: SortOrder
    category?: SortOrder
    description?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AchievementMinOrderByAggregateInput = {
    id?: SortOrder
    metric?: SortOrder
    title?: SortOrder
    category?: SortOrder
    description?: SortOrder
    displayOrder?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AchievementSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type PersonalInfoCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    greeting?: SortOrder
    title?: SortOrder
    roles?: SortOrder
    tagline?: SortOrder
    description?: SortOrder
    selfIntroVideo?: SortOrder
    educationSummary?: SortOrder
    cta?: SortOrder
    social?: SortOrder
    media?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonalInfoMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    greeting?: SortOrder
    title?: SortOrder
    roles?: SortOrder
    tagline?: SortOrder
    description?: SortOrder
    selfIntroVideo?: SortOrder
    educationSummary?: SortOrder
    cta?: SortOrder
    social?: SortOrder
    media?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonalInfoMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    greeting?: SortOrder
    title?: SortOrder
    roles?: SortOrder
    tagline?: SortOrder
    description?: SortOrder
    selfIntroVideo?: SortOrder
    educationSummary?: SortOrder
    cta?: SortOrder
    social?: SortOrder
    media?: SortOrder
    updatedAt?: SortOrder
  }

  export type RetiredIdCountOrderByAggregateInput = {
    id?: SortOrder
    entity?: SortOrder
    retiredAt?: SortOrder
  }

  export type RetiredIdMaxOrderByAggregateInput = {
    id?: SortOrder
    entity?: SortOrder
    retiredAt?: SortOrder
  }

  export type RetiredIdMinOrderByAggregateInput = {
    id?: SortOrder
    entity?: SortOrder
    retiredAt?: SortOrder
  }

  export type ProjectGalleryImageCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectGalleryImageCreateWithoutProjectInput, ProjectGalleryImageUncheckedCreateWithoutProjectInput> | ProjectGalleryImageCreateWithoutProjectInput[] | ProjectGalleryImageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectGalleryImageCreateOrConnectWithoutProjectInput | ProjectGalleryImageCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectGalleryImageCreateManyProjectInputEnvelope
    connect?: ProjectGalleryImageWhereUniqueInput | ProjectGalleryImageWhereUniqueInput[]
  }

  export type ProjectGalleryImageUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectGalleryImageCreateWithoutProjectInput, ProjectGalleryImageUncheckedCreateWithoutProjectInput> | ProjectGalleryImageCreateWithoutProjectInput[] | ProjectGalleryImageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectGalleryImageCreateOrConnectWithoutProjectInput | ProjectGalleryImageCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectGalleryImageCreateManyProjectInputEnvelope
    connect?: ProjectGalleryImageWhereUniqueInput | ProjectGalleryImageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProjectGalleryImageUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectGalleryImageCreateWithoutProjectInput, ProjectGalleryImageUncheckedCreateWithoutProjectInput> | ProjectGalleryImageCreateWithoutProjectInput[] | ProjectGalleryImageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectGalleryImageCreateOrConnectWithoutProjectInput | ProjectGalleryImageCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectGalleryImageUpsertWithWhereUniqueWithoutProjectInput | ProjectGalleryImageUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectGalleryImageCreateManyProjectInputEnvelope
    set?: ProjectGalleryImageWhereUniqueInput | ProjectGalleryImageWhereUniqueInput[]
    disconnect?: ProjectGalleryImageWhereUniqueInput | ProjectGalleryImageWhereUniqueInput[]
    delete?: ProjectGalleryImageWhereUniqueInput | ProjectGalleryImageWhereUniqueInput[]
    connect?: ProjectGalleryImageWhereUniqueInput | ProjectGalleryImageWhereUniqueInput[]
    update?: ProjectGalleryImageUpdateWithWhereUniqueWithoutProjectInput | ProjectGalleryImageUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectGalleryImageUpdateManyWithWhereWithoutProjectInput | ProjectGalleryImageUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectGalleryImageScalarWhereInput | ProjectGalleryImageScalarWhereInput[]
  }

  export type ProjectGalleryImageUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectGalleryImageCreateWithoutProjectInput, ProjectGalleryImageUncheckedCreateWithoutProjectInput> | ProjectGalleryImageCreateWithoutProjectInput[] | ProjectGalleryImageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectGalleryImageCreateOrConnectWithoutProjectInput | ProjectGalleryImageCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectGalleryImageUpsertWithWhereUniqueWithoutProjectInput | ProjectGalleryImageUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectGalleryImageCreateManyProjectInputEnvelope
    set?: ProjectGalleryImageWhereUniqueInput | ProjectGalleryImageWhereUniqueInput[]
    disconnect?: ProjectGalleryImageWhereUniqueInput | ProjectGalleryImageWhereUniqueInput[]
    delete?: ProjectGalleryImageWhereUniqueInput | ProjectGalleryImageWhereUniqueInput[]
    connect?: ProjectGalleryImageWhereUniqueInput | ProjectGalleryImageWhereUniqueInput[]
    update?: ProjectGalleryImageUpdateWithWhereUniqueWithoutProjectInput | ProjectGalleryImageUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectGalleryImageUpdateManyWithWhereWithoutProjectInput | ProjectGalleryImageUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectGalleryImageScalarWhereInput | ProjectGalleryImageScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutGalleryImagesInput = {
    create?: XOR<ProjectCreateWithoutGalleryImagesInput, ProjectUncheckedCreateWithoutGalleryImagesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutGalleryImagesInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutGalleryImagesNestedInput = {
    create?: XOR<ProjectCreateWithoutGalleryImagesInput, ProjectUncheckedCreateWithoutGalleryImagesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutGalleryImagesInput
    upsert?: ProjectUpsertWithoutGalleryImagesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutGalleryImagesInput, ProjectUpdateWithoutGalleryImagesInput>, ProjectUncheckedUpdateWithoutGalleryImagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProjectGalleryImageCreateWithoutProjectInput = {
    id?: string
    imageUrl: string
    order?: number
  }

  export type ProjectGalleryImageUncheckedCreateWithoutProjectInput = {
    id?: string
    imageUrl: string
    order?: number
  }

  export type ProjectGalleryImageCreateOrConnectWithoutProjectInput = {
    where: ProjectGalleryImageWhereUniqueInput
    create: XOR<ProjectGalleryImageCreateWithoutProjectInput, ProjectGalleryImageUncheckedCreateWithoutProjectInput>
  }

  export type ProjectGalleryImageCreateManyProjectInputEnvelope = {
    data: ProjectGalleryImageCreateManyProjectInput | ProjectGalleryImageCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectGalleryImageUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectGalleryImageWhereUniqueInput
    update: XOR<ProjectGalleryImageUpdateWithoutProjectInput, ProjectGalleryImageUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectGalleryImageCreateWithoutProjectInput, ProjectGalleryImageUncheckedCreateWithoutProjectInput>
  }

  export type ProjectGalleryImageUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectGalleryImageWhereUniqueInput
    data: XOR<ProjectGalleryImageUpdateWithoutProjectInput, ProjectGalleryImageUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectGalleryImageUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectGalleryImageScalarWhereInput
    data: XOR<ProjectGalleryImageUpdateManyMutationInput, ProjectGalleryImageUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectGalleryImageScalarWhereInput = {
    AND?: ProjectGalleryImageScalarWhereInput | ProjectGalleryImageScalarWhereInput[]
    OR?: ProjectGalleryImageScalarWhereInput[]
    NOT?: ProjectGalleryImageScalarWhereInput | ProjectGalleryImageScalarWhereInput[]
    id?: StringFilter<"ProjectGalleryImage"> | string
    projectId?: StringFilter<"ProjectGalleryImage"> | string
    imageUrl?: StringFilter<"ProjectGalleryImage"> | string
    order?: IntFilter<"ProjectGalleryImage"> | number
  }

  export type ProjectCreateWithoutGalleryImagesInput = {
    id: string
    slug: string
    number?: string
    displayOrder?: number
    isPublished?: boolean
    title: string
    category: string
    categories: string
    domain: string
    organization?: string | null
    shortDescription: string
    fullDescription: string
    technologies: string
    features: string
    mainImage: string
    liveUrl?: string | null
    githubUrl?: string | null
    year: string
    status: string
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUncheckedCreateWithoutGalleryImagesInput = {
    id: string
    slug: string
    number?: string
    displayOrder?: number
    isPublished?: boolean
    title: string
    category: string
    categories: string
    domain: string
    organization?: string | null
    shortDescription: string
    fullDescription: string
    technologies: string
    features: string
    mainImage: string
    liveUrl?: string | null
    githubUrl?: string | null
    year: string
    status: string
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateOrConnectWithoutGalleryImagesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutGalleryImagesInput, ProjectUncheckedCreateWithoutGalleryImagesInput>
  }

  export type ProjectUpsertWithoutGalleryImagesInput = {
    update: XOR<ProjectUpdateWithoutGalleryImagesInput, ProjectUncheckedUpdateWithoutGalleryImagesInput>
    create: XOR<ProjectCreateWithoutGalleryImagesInput, ProjectUncheckedCreateWithoutGalleryImagesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutGalleryImagesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutGalleryImagesInput, ProjectUncheckedUpdateWithoutGalleryImagesInput>
  }

  export type ProjectUpdateWithoutGalleryImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: StringFieldUpdateOperationsInput | string
    fullDescription?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    mainImage?: StringFieldUpdateOperationsInput | string
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateWithoutGalleryImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: StringFieldUpdateOperationsInput | string
    fullDescription?: StringFieldUpdateOperationsInput | string
    technologies?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    mainImage?: StringFieldUpdateOperationsInput | string
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectGalleryImageCreateManyProjectInput = {
    id?: string
    imageUrl: string
    order?: number
  }

  export type ProjectGalleryImageUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProjectGalleryImageUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProjectGalleryImageUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}