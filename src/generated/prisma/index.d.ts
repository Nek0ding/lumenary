
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Kategori
 * 
 */
export type Kategori = $Result.DefaultSelection<Prisma.$KategoriPayload>
/**
 * Model Buku
 * 
 */
export type Buku = $Result.DefaultSelection<Prisma.$BukuPayload>
/**
 * Model Peminjaman
 * 
 */
export type Peminjaman = $Result.DefaultSelection<Prisma.$PeminjamanPayload>
/**
 * Model Rating
 * 
 */
export type Rating = $Result.DefaultSelection<Prisma.$RatingPayload>
/**
 * Model Denda
 * 
 */
export type Denda = $Result.DefaultSelection<Prisma.$DendaPayload>
/**
 * Model Favorit
 * 
 */
export type Favorit = $Result.DefaultSelection<Prisma.$FavoritPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StatusPeminjaman: {
  direservasi: 'direservasi',
  dibatalkan: 'dibatalkan',
  dipinjam: 'dipinjam',
  dikembalikan: 'dikembalikan',
  terlambat: 'terlambat'
};

export type StatusPeminjaman = (typeof StatusPeminjaman)[keyof typeof StatusPeminjaman]


export const StatusBayar: {
  belum_bayar: 'belum_bayar',
  sudah_bayar: 'sudah_bayar'
};

export type StatusBayar = (typeof StatusBayar)[keyof typeof StatusBayar]


export const Role: {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const JK: {
  L: 'L',
  P: 'P'
};

export type JK = (typeof JK)[keyof typeof JK]


export const keteranganDenda: {
  tidak_ada: 'tidak_ada',
  sobek: 'sobek',
  noda: 'noda',
  rusak_total: 'rusak_total',
  kehilangan_buku: 'kehilangan_buku'
};

export type keteranganDenda = (typeof keteranganDenda)[keyof typeof keteranganDenda]

}

export type StatusPeminjaman = $Enums.StatusPeminjaman

export const StatusPeminjaman: typeof $Enums.StatusPeminjaman

export type StatusBayar = $Enums.StatusBayar

export const StatusBayar: typeof $Enums.StatusBayar

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type JK = $Enums.JK

export const JK: typeof $Enums.JK

export type keteranganDenda = $Enums.keteranganDenda

export const keteranganDenda: typeof $Enums.keteranganDenda

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.kategori`: Exposes CRUD operations for the **Kategori** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Kategoris
    * const kategoris = await prisma.kategori.findMany()
    * ```
    */
  get kategori(): Prisma.KategoriDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.buku`: Exposes CRUD operations for the **Buku** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bukus
    * const bukus = await prisma.buku.findMany()
    * ```
    */
  get buku(): Prisma.BukuDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.peminjaman`: Exposes CRUD operations for the **Peminjaman** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Peminjamen
    * const peminjamen = await prisma.peminjaman.findMany()
    * ```
    */
  get peminjaman(): Prisma.PeminjamanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rating`: Exposes CRUD operations for the **Rating** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ratings
    * const ratings = await prisma.rating.findMany()
    * ```
    */
  get rating(): Prisma.RatingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.denda`: Exposes CRUD operations for the **Denda** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dendas
    * const dendas = await prisma.denda.findMany()
    * ```
    */
  get denda(): Prisma.DendaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.favorit`: Exposes CRUD operations for the **Favorit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Favorits
    * const favorits = await prisma.favorit.findMany()
    * ```
    */
  get favorit(): Prisma.FavoritDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
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
      (Without<T, U> & U) | (Without<U, T> & T)
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
    User: 'User',
    Kategori: 'Kategori',
    Buku: 'Buku',
    Peminjaman: 'Peminjaman',
    Rating: 'Rating',
    Denda: 'Denda',
    Favorit: 'Favorit'
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
      modelProps: "user" | "kategori" | "buku" | "peminjaman" | "rating" | "denda" | "favorit"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Kategori: {
        payload: Prisma.$KategoriPayload<ExtArgs>
        fields: Prisma.KategoriFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KategoriFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KategoriFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>
          }
          findFirst: {
            args: Prisma.KategoriFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KategoriFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>
          }
          findMany: {
            args: Prisma.KategoriFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>[]
          }
          create: {
            args: Prisma.KategoriCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>
          }
          createMany: {
            args: Prisma.KategoriCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KategoriCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>[]
          }
          delete: {
            args: Prisma.KategoriDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>
          }
          update: {
            args: Prisma.KategoriUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>
          }
          deleteMany: {
            args: Prisma.KategoriDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KategoriUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KategoriUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>[]
          }
          upsert: {
            args: Prisma.KategoriUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>
          }
          aggregate: {
            args: Prisma.KategoriAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKategori>
          }
          groupBy: {
            args: Prisma.KategoriGroupByArgs<ExtArgs>
            result: $Utils.Optional<KategoriGroupByOutputType>[]
          }
          count: {
            args: Prisma.KategoriCountArgs<ExtArgs>
            result: $Utils.Optional<KategoriCountAggregateOutputType> | number
          }
        }
      }
      Buku: {
        payload: Prisma.$BukuPayload<ExtArgs>
        fields: Prisma.BukuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BukuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BukuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BukuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BukuPayload>
          }
          findFirst: {
            args: Prisma.BukuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BukuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BukuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BukuPayload>
          }
          findMany: {
            args: Prisma.BukuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BukuPayload>[]
          }
          create: {
            args: Prisma.BukuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BukuPayload>
          }
          createMany: {
            args: Prisma.BukuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BukuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BukuPayload>[]
          }
          delete: {
            args: Prisma.BukuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BukuPayload>
          }
          update: {
            args: Prisma.BukuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BukuPayload>
          }
          deleteMany: {
            args: Prisma.BukuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BukuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BukuUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BukuPayload>[]
          }
          upsert: {
            args: Prisma.BukuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BukuPayload>
          }
          aggregate: {
            args: Prisma.BukuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBuku>
          }
          groupBy: {
            args: Prisma.BukuGroupByArgs<ExtArgs>
            result: $Utils.Optional<BukuGroupByOutputType>[]
          }
          count: {
            args: Prisma.BukuCountArgs<ExtArgs>
            result: $Utils.Optional<BukuCountAggregateOutputType> | number
          }
        }
      }
      Peminjaman: {
        payload: Prisma.$PeminjamanPayload<ExtArgs>
        fields: Prisma.PeminjamanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PeminjamanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeminjamanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PeminjamanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeminjamanPayload>
          }
          findFirst: {
            args: Prisma.PeminjamanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeminjamanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PeminjamanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeminjamanPayload>
          }
          findMany: {
            args: Prisma.PeminjamanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeminjamanPayload>[]
          }
          create: {
            args: Prisma.PeminjamanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeminjamanPayload>
          }
          createMany: {
            args: Prisma.PeminjamanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PeminjamanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeminjamanPayload>[]
          }
          delete: {
            args: Prisma.PeminjamanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeminjamanPayload>
          }
          update: {
            args: Prisma.PeminjamanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeminjamanPayload>
          }
          deleteMany: {
            args: Prisma.PeminjamanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PeminjamanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PeminjamanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeminjamanPayload>[]
          }
          upsert: {
            args: Prisma.PeminjamanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeminjamanPayload>
          }
          aggregate: {
            args: Prisma.PeminjamanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePeminjaman>
          }
          groupBy: {
            args: Prisma.PeminjamanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PeminjamanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PeminjamanCountArgs<ExtArgs>
            result: $Utils.Optional<PeminjamanCountAggregateOutputType> | number
          }
        }
      }
      Rating: {
        payload: Prisma.$RatingPayload<ExtArgs>
        fields: Prisma.RatingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RatingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RatingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          findFirst: {
            args: Prisma.RatingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RatingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          findMany: {
            args: Prisma.RatingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          create: {
            args: Prisma.RatingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          createMany: {
            args: Prisma.RatingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RatingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          delete: {
            args: Prisma.RatingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          update: {
            args: Prisma.RatingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          deleteMany: {
            args: Prisma.RatingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RatingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RatingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          upsert: {
            args: Prisma.RatingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          aggregate: {
            args: Prisma.RatingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRating>
          }
          groupBy: {
            args: Prisma.RatingGroupByArgs<ExtArgs>
            result: $Utils.Optional<RatingGroupByOutputType>[]
          }
          count: {
            args: Prisma.RatingCountArgs<ExtArgs>
            result: $Utils.Optional<RatingCountAggregateOutputType> | number
          }
        }
      }
      Denda: {
        payload: Prisma.$DendaPayload<ExtArgs>
        fields: Prisma.DendaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DendaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DendaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DendaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DendaPayload>
          }
          findFirst: {
            args: Prisma.DendaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DendaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DendaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DendaPayload>
          }
          findMany: {
            args: Prisma.DendaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DendaPayload>[]
          }
          create: {
            args: Prisma.DendaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DendaPayload>
          }
          createMany: {
            args: Prisma.DendaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DendaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DendaPayload>[]
          }
          delete: {
            args: Prisma.DendaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DendaPayload>
          }
          update: {
            args: Prisma.DendaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DendaPayload>
          }
          deleteMany: {
            args: Prisma.DendaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DendaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DendaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DendaPayload>[]
          }
          upsert: {
            args: Prisma.DendaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DendaPayload>
          }
          aggregate: {
            args: Prisma.DendaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDenda>
          }
          groupBy: {
            args: Prisma.DendaGroupByArgs<ExtArgs>
            result: $Utils.Optional<DendaGroupByOutputType>[]
          }
          count: {
            args: Prisma.DendaCountArgs<ExtArgs>
            result: $Utils.Optional<DendaCountAggregateOutputType> | number
          }
        }
      }
      Favorit: {
        payload: Prisma.$FavoritPayload<ExtArgs>
        fields: Prisma.FavoritFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FavoritFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavoritFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritPayload>
          }
          findFirst: {
            args: Prisma.FavoritFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavoritFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritPayload>
          }
          findMany: {
            args: Prisma.FavoritFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritPayload>[]
          }
          create: {
            args: Prisma.FavoritCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritPayload>
          }
          createMany: {
            args: Prisma.FavoritCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FavoritCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritPayload>[]
          }
          delete: {
            args: Prisma.FavoritDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritPayload>
          }
          update: {
            args: Prisma.FavoritUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritPayload>
          }
          deleteMany: {
            args: Prisma.FavoritDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FavoritUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FavoritUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritPayload>[]
          }
          upsert: {
            args: Prisma.FavoritUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritPayload>
          }
          aggregate: {
            args: Prisma.FavoritAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavorit>
          }
          groupBy: {
            args: Prisma.FavoritGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavoritGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavoritCountArgs<ExtArgs>
            result: $Utils.Optional<FavoritCountAggregateOutputType> | number
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
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
    user?: UserOmit
    kategori?: KategoriOmit
    buku?: BukuOmit
    peminjaman?: PeminjamanOmit
    rating?: RatingOmit
    denda?: DendaOmit
    favorit?: FavoritOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    peminjaman: number
    ratings: number
    favorit: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    peminjaman?: boolean | UserCountOutputTypeCountPeminjamanArgs
    ratings?: boolean | UserCountOutputTypeCountRatingsArgs
    favorit?: boolean | UserCountOutputTypeCountFavoritArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPeminjamanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeminjamanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRatingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoritArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoritWhereInput
  }


  /**
   * Count Type KategoriCountOutputType
   */

  export type KategoriCountOutputType = {
    buku: number
  }

  export type KategoriCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    buku?: boolean | KategoriCountOutputTypeCountBukuArgs
  }

  // Custom InputTypes
  /**
   * KategoriCountOutputType without action
   */
  export type KategoriCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KategoriCountOutputType
     */
    select?: KategoriCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KategoriCountOutputType without action
   */
  export type KategoriCountOutputTypeCountBukuArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BukuWhereInput
  }


  /**
   * Count Type BukuCountOutputType
   */

  export type BukuCountOutputType = {
    peminjaman: number
    ratings: number
    favorit: number
  }

  export type BukuCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    peminjaman?: boolean | BukuCountOutputTypeCountPeminjamanArgs
    ratings?: boolean | BukuCountOutputTypeCountRatingsArgs
    favorit?: boolean | BukuCountOutputTypeCountFavoritArgs
  }

  // Custom InputTypes
  /**
   * BukuCountOutputType without action
   */
  export type BukuCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BukuCountOutputType
     */
    select?: BukuCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BukuCountOutputType without action
   */
  export type BukuCountOutputTypeCountPeminjamanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeminjamanWhereInput
  }

  /**
   * BukuCountOutputType without action
   */
  export type BukuCountOutputTypeCountRatingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
  }

  /**
   * BukuCountOutputType without action
   */
  export type BukuCountOutputTypeCountFavoritArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoritWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id_user: string | null
    nama: string | null
    npm: string | null
    no_telp: string | null
    email: string | null
    password: string | null
    alamat: string | null
    jenis_kelamin: $Enums.JK | null
    role: $Enums.Role | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id_user: string | null
    nama: string | null
    npm: string | null
    no_telp: string | null
    email: string | null
    password: string | null
    alamat: string | null
    jenis_kelamin: $Enums.JK | null
    role: $Enums.Role | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id_user: number
    nama: number
    npm: number
    no_telp: number
    email: number
    password: number
    alamat: number
    jenis_kelamin: number
    role: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id_user?: true
    nama?: true
    npm?: true
    no_telp?: true
    email?: true
    password?: true
    alamat?: true
    jenis_kelamin?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id_user?: true
    nama?: true
    npm?: true
    no_telp?: true
    email?: true
    password?: true
    alamat?: true
    jenis_kelamin?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id_user?: true
    nama?: true
    npm?: true
    no_telp?: true
    email?: true
    password?: true
    alamat?: true
    jenis_kelamin?: true
    role?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id_user: string
    nama: string | null
    npm: string
    no_telp: string | null
    email: string
    password: string
    alamat: string | null
    jenis_kelamin: $Enums.JK | null
    role: $Enums.Role
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_user?: boolean
    nama?: boolean
    npm?: boolean
    no_telp?: boolean
    email?: boolean
    password?: boolean
    alamat?: boolean
    jenis_kelamin?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
    peminjaman?: boolean | User$peminjamanArgs<ExtArgs>
    ratings?: boolean | User$ratingsArgs<ExtArgs>
    favorit?: boolean | User$favoritArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_user?: boolean
    nama?: boolean
    npm?: boolean
    no_telp?: boolean
    email?: boolean
    password?: boolean
    alamat?: boolean
    jenis_kelamin?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_user?: boolean
    nama?: boolean
    npm?: boolean
    no_telp?: boolean
    email?: boolean
    password?: boolean
    alamat?: boolean
    jenis_kelamin?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id_user?: boolean
    nama?: boolean
    npm?: boolean
    no_telp?: boolean
    email?: boolean
    password?: boolean
    alamat?: boolean
    jenis_kelamin?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_user" | "nama" | "npm" | "no_telp" | "email" | "password" | "alamat" | "jenis_kelamin" | "role" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    peminjaman?: boolean | User$peminjamanArgs<ExtArgs>
    ratings?: boolean | User$ratingsArgs<ExtArgs>
    favorit?: boolean | User$favoritArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      peminjaman: Prisma.$PeminjamanPayload<ExtArgs>[]
      ratings: Prisma.$RatingPayload<ExtArgs>[]
      favorit: Prisma.$FavoritPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_user: string
      nama: string | null
      npm: string
      no_telp: string | null
      email: string
      password: string
      alamat: string | null
      jenis_kelamin: $Enums.JK | null
      role: $Enums.Role
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id_user`
     * const userWithId_userOnly = await prisma.user.findMany({ select: { id_user: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id_user`
     * const userWithId_userOnly = await prisma.user.createManyAndReturn({
     *   select: { id_user: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id_user`
     * const userWithId_userOnly = await prisma.user.updateManyAndReturn({
     *   select: { id_user: true },
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    peminjaman<T extends User$peminjamanArgs<ExtArgs> = {}>(args?: Subset<T, User$peminjamanArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ratings<T extends User$ratingsArgs<ExtArgs> = {}>(args?: Subset<T, User$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorit<T extends User$favoritArgs<ExtArgs> = {}>(args?: Subset<T, User$favoritArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id_user: FieldRef<"User", 'String'>
    readonly nama: FieldRef<"User", 'String'>
    readonly npm: FieldRef<"User", 'String'>
    readonly no_telp: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly alamat: FieldRef<"User", 'String'>
    readonly jenis_kelamin: FieldRef<"User", 'JK'>
    readonly role: FieldRef<"User", 'Role'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.peminjaman
   */
  export type User$peminjamanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanInclude<ExtArgs> | null
    where?: PeminjamanWhereInput
    orderBy?: PeminjamanOrderByWithRelationInput | PeminjamanOrderByWithRelationInput[]
    cursor?: PeminjamanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PeminjamanScalarFieldEnum | PeminjamanScalarFieldEnum[]
  }

  /**
   * User.ratings
   */
  export type User$ratingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    cursor?: RatingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * User.favorit
   */
  export type User$favoritArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritInclude<ExtArgs> | null
    where?: FavoritWhereInput
    orderBy?: FavoritOrderByWithRelationInput | FavoritOrderByWithRelationInput[]
    cursor?: FavoritWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoritScalarFieldEnum | FavoritScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Kategori
   */

  export type AggregateKategori = {
    _count: KategoriCountAggregateOutputType | null
    _avg: KategoriAvgAggregateOutputType | null
    _sum: KategoriSumAggregateOutputType | null
    _min: KategoriMinAggregateOutputType | null
    _max: KategoriMaxAggregateOutputType | null
  }

  export type KategoriAvgAggregateOutputType = {
    id_kategori: number | null
  }

  export type KategoriSumAggregateOutputType = {
    id_kategori: number | null
  }

  export type KategoriMinAggregateOutputType = {
    id_kategori: number | null
    nama_kategori: string | null
    deskripsi: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type KategoriMaxAggregateOutputType = {
    id_kategori: number | null
    nama_kategori: string | null
    deskripsi: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type KategoriCountAggregateOutputType = {
    id_kategori: number
    nama_kategori: number
    deskripsi: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type KategoriAvgAggregateInputType = {
    id_kategori?: true
  }

  export type KategoriSumAggregateInputType = {
    id_kategori?: true
  }

  export type KategoriMinAggregateInputType = {
    id_kategori?: true
    nama_kategori?: true
    deskripsi?: true
    created_at?: true
    updated_at?: true
  }

  export type KategoriMaxAggregateInputType = {
    id_kategori?: true
    nama_kategori?: true
    deskripsi?: true
    created_at?: true
    updated_at?: true
  }

  export type KategoriCountAggregateInputType = {
    id_kategori?: true
    nama_kategori?: true
    deskripsi?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type KategoriAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kategori to aggregate.
     */
    where?: KategoriWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kategoris to fetch.
     */
    orderBy?: KategoriOrderByWithRelationInput | KategoriOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KategoriWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kategoris from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kategoris.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Kategoris
    **/
    _count?: true | KategoriCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KategoriAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KategoriSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KategoriMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KategoriMaxAggregateInputType
  }

  export type GetKategoriAggregateType<T extends KategoriAggregateArgs> = {
        [P in keyof T & keyof AggregateKategori]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKategori[P]>
      : GetScalarType<T[P], AggregateKategori[P]>
  }




  export type KategoriGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KategoriWhereInput
    orderBy?: KategoriOrderByWithAggregationInput | KategoriOrderByWithAggregationInput[]
    by: KategoriScalarFieldEnum[] | KategoriScalarFieldEnum
    having?: KategoriScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KategoriCountAggregateInputType | true
    _avg?: KategoriAvgAggregateInputType
    _sum?: KategoriSumAggregateInputType
    _min?: KategoriMinAggregateInputType
    _max?: KategoriMaxAggregateInputType
  }

  export type KategoriGroupByOutputType = {
    id_kategori: number
    nama_kategori: string
    deskripsi: string
    created_at: Date
    updated_at: Date
    _count: KategoriCountAggregateOutputType | null
    _avg: KategoriAvgAggregateOutputType | null
    _sum: KategoriSumAggregateOutputType | null
    _min: KategoriMinAggregateOutputType | null
    _max: KategoriMaxAggregateOutputType | null
  }

  type GetKategoriGroupByPayload<T extends KategoriGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KategoriGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KategoriGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KategoriGroupByOutputType[P]>
            : GetScalarType<T[P], KategoriGroupByOutputType[P]>
        }
      >
    >


  export type KategoriSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_kategori?: boolean
    nama_kategori?: boolean
    deskripsi?: boolean
    created_at?: boolean
    updated_at?: boolean
    buku?: boolean | Kategori$bukuArgs<ExtArgs>
    _count?: boolean | KategoriCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kategori"]>

  export type KategoriSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_kategori?: boolean
    nama_kategori?: boolean
    deskripsi?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["kategori"]>

  export type KategoriSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_kategori?: boolean
    nama_kategori?: boolean
    deskripsi?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["kategori"]>

  export type KategoriSelectScalar = {
    id_kategori?: boolean
    nama_kategori?: boolean
    deskripsi?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type KategoriOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_kategori" | "nama_kategori" | "deskripsi" | "created_at" | "updated_at", ExtArgs["result"]["kategori"]>
  export type KategoriInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    buku?: boolean | Kategori$bukuArgs<ExtArgs>
    _count?: boolean | KategoriCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type KategoriIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type KategoriIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $KategoriPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Kategori"
    objects: {
      buku: Prisma.$BukuPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_kategori: number
      nama_kategori: string
      deskripsi: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["kategori"]>
    composites: {}
  }

  type KategoriGetPayload<S extends boolean | null | undefined | KategoriDefaultArgs> = $Result.GetResult<Prisma.$KategoriPayload, S>

  type KategoriCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KategoriFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KategoriCountAggregateInputType | true
    }

  export interface KategoriDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Kategori'], meta: { name: 'Kategori' } }
    /**
     * Find zero or one Kategori that matches the filter.
     * @param {KategoriFindUniqueArgs} args - Arguments to find a Kategori
     * @example
     * // Get one Kategori
     * const kategori = await prisma.kategori.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KategoriFindUniqueArgs>(args: SelectSubset<T, KategoriFindUniqueArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Kategori that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KategoriFindUniqueOrThrowArgs} args - Arguments to find a Kategori
     * @example
     * // Get one Kategori
     * const kategori = await prisma.kategori.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KategoriFindUniqueOrThrowArgs>(args: SelectSubset<T, KategoriFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kategori that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriFindFirstArgs} args - Arguments to find a Kategori
     * @example
     * // Get one Kategori
     * const kategori = await prisma.kategori.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KategoriFindFirstArgs>(args?: SelectSubset<T, KategoriFindFirstArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kategori that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriFindFirstOrThrowArgs} args - Arguments to find a Kategori
     * @example
     * // Get one Kategori
     * const kategori = await prisma.kategori.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KategoriFindFirstOrThrowArgs>(args?: SelectSubset<T, KategoriFindFirstOrThrowArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Kategoris that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Kategoris
     * const kategoris = await prisma.kategori.findMany()
     * 
     * // Get first 10 Kategoris
     * const kategoris = await prisma.kategori.findMany({ take: 10 })
     * 
     * // Only select the `id_kategori`
     * const kategoriWithId_kategoriOnly = await prisma.kategori.findMany({ select: { id_kategori: true } })
     * 
     */
    findMany<T extends KategoriFindManyArgs>(args?: SelectSubset<T, KategoriFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Kategori.
     * @param {KategoriCreateArgs} args - Arguments to create a Kategori.
     * @example
     * // Create one Kategori
     * const Kategori = await prisma.kategori.create({
     *   data: {
     *     // ... data to create a Kategori
     *   }
     * })
     * 
     */
    create<T extends KategoriCreateArgs>(args: SelectSubset<T, KategoriCreateArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Kategoris.
     * @param {KategoriCreateManyArgs} args - Arguments to create many Kategoris.
     * @example
     * // Create many Kategoris
     * const kategori = await prisma.kategori.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KategoriCreateManyArgs>(args?: SelectSubset<T, KategoriCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Kategoris and returns the data saved in the database.
     * @param {KategoriCreateManyAndReturnArgs} args - Arguments to create many Kategoris.
     * @example
     * // Create many Kategoris
     * const kategori = await prisma.kategori.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Kategoris and only return the `id_kategori`
     * const kategoriWithId_kategoriOnly = await prisma.kategori.createManyAndReturn({
     *   select: { id_kategori: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KategoriCreateManyAndReturnArgs>(args?: SelectSubset<T, KategoriCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Kategori.
     * @param {KategoriDeleteArgs} args - Arguments to delete one Kategori.
     * @example
     * // Delete one Kategori
     * const Kategori = await prisma.kategori.delete({
     *   where: {
     *     // ... filter to delete one Kategori
     *   }
     * })
     * 
     */
    delete<T extends KategoriDeleteArgs>(args: SelectSubset<T, KategoriDeleteArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Kategori.
     * @param {KategoriUpdateArgs} args - Arguments to update one Kategori.
     * @example
     * // Update one Kategori
     * const kategori = await prisma.kategori.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KategoriUpdateArgs>(args: SelectSubset<T, KategoriUpdateArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Kategoris.
     * @param {KategoriDeleteManyArgs} args - Arguments to filter Kategoris to delete.
     * @example
     * // Delete a few Kategoris
     * const { count } = await prisma.kategori.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KategoriDeleteManyArgs>(args?: SelectSubset<T, KategoriDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kategoris.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Kategoris
     * const kategori = await prisma.kategori.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KategoriUpdateManyArgs>(args: SelectSubset<T, KategoriUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kategoris and returns the data updated in the database.
     * @param {KategoriUpdateManyAndReturnArgs} args - Arguments to update many Kategoris.
     * @example
     * // Update many Kategoris
     * const kategori = await prisma.kategori.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Kategoris and only return the `id_kategori`
     * const kategoriWithId_kategoriOnly = await prisma.kategori.updateManyAndReturn({
     *   select: { id_kategori: true },
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
    updateManyAndReturn<T extends KategoriUpdateManyAndReturnArgs>(args: SelectSubset<T, KategoriUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Kategori.
     * @param {KategoriUpsertArgs} args - Arguments to update or create a Kategori.
     * @example
     * // Update or create a Kategori
     * const kategori = await prisma.kategori.upsert({
     *   create: {
     *     // ... data to create a Kategori
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Kategori we want to update
     *   }
     * })
     */
    upsert<T extends KategoriUpsertArgs>(args: SelectSubset<T, KategoriUpsertArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Kategoris.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriCountArgs} args - Arguments to filter Kategoris to count.
     * @example
     * // Count the number of Kategoris
     * const count = await prisma.kategori.count({
     *   where: {
     *     // ... the filter for the Kategoris we want to count
     *   }
     * })
    **/
    count<T extends KategoriCountArgs>(
      args?: Subset<T, KategoriCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KategoriCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Kategori.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KategoriAggregateArgs>(args: Subset<T, KategoriAggregateArgs>): Prisma.PrismaPromise<GetKategoriAggregateType<T>>

    /**
     * Group by Kategori.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriGroupByArgs} args - Group by arguments.
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
      T extends KategoriGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KategoriGroupByArgs['orderBy'] }
        : { orderBy?: KategoriGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, KategoriGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKategoriGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Kategori model
   */
  readonly fields: KategoriFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Kategori.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KategoriClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    buku<T extends Kategori$bukuArgs<ExtArgs> = {}>(args?: Subset<T, Kategori$bukuArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Kategori model
   */
  interface KategoriFieldRefs {
    readonly id_kategori: FieldRef<"Kategori", 'Int'>
    readonly nama_kategori: FieldRef<"Kategori", 'String'>
    readonly deskripsi: FieldRef<"Kategori", 'String'>
    readonly created_at: FieldRef<"Kategori", 'DateTime'>
    readonly updated_at: FieldRef<"Kategori", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Kategori findUnique
   */
  export type KategoriFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * Filter, which Kategori to fetch.
     */
    where: KategoriWhereUniqueInput
  }

  /**
   * Kategori findUniqueOrThrow
   */
  export type KategoriFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * Filter, which Kategori to fetch.
     */
    where: KategoriWhereUniqueInput
  }

  /**
   * Kategori findFirst
   */
  export type KategoriFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * Filter, which Kategori to fetch.
     */
    where?: KategoriWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kategoris to fetch.
     */
    orderBy?: KategoriOrderByWithRelationInput | KategoriOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kategoris.
     */
    cursor?: KategoriWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kategoris from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kategoris.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kategoris.
     */
    distinct?: KategoriScalarFieldEnum | KategoriScalarFieldEnum[]
  }

  /**
   * Kategori findFirstOrThrow
   */
  export type KategoriFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * Filter, which Kategori to fetch.
     */
    where?: KategoriWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kategoris to fetch.
     */
    orderBy?: KategoriOrderByWithRelationInput | KategoriOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kategoris.
     */
    cursor?: KategoriWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kategoris from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kategoris.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kategoris.
     */
    distinct?: KategoriScalarFieldEnum | KategoriScalarFieldEnum[]
  }

  /**
   * Kategori findMany
   */
  export type KategoriFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * Filter, which Kategoris to fetch.
     */
    where?: KategoriWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kategoris to fetch.
     */
    orderBy?: KategoriOrderByWithRelationInput | KategoriOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Kategoris.
     */
    cursor?: KategoriWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kategoris from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kategoris.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kategoris.
     */
    distinct?: KategoriScalarFieldEnum | KategoriScalarFieldEnum[]
  }

  /**
   * Kategori create
   */
  export type KategoriCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * The data needed to create a Kategori.
     */
    data: XOR<KategoriCreateInput, KategoriUncheckedCreateInput>
  }

  /**
   * Kategori createMany
   */
  export type KategoriCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Kategoris.
     */
    data: KategoriCreateManyInput | KategoriCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kategori createManyAndReturn
   */
  export type KategoriCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * The data used to create many Kategoris.
     */
    data: KategoriCreateManyInput | KategoriCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kategori update
   */
  export type KategoriUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * The data needed to update a Kategori.
     */
    data: XOR<KategoriUpdateInput, KategoriUncheckedUpdateInput>
    /**
     * Choose, which Kategori to update.
     */
    where: KategoriWhereUniqueInput
  }

  /**
   * Kategori updateMany
   */
  export type KategoriUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Kategoris.
     */
    data: XOR<KategoriUpdateManyMutationInput, KategoriUncheckedUpdateManyInput>
    /**
     * Filter which Kategoris to update
     */
    where?: KategoriWhereInput
    /**
     * Limit how many Kategoris to update.
     */
    limit?: number
  }

  /**
   * Kategori updateManyAndReturn
   */
  export type KategoriUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * The data used to update Kategoris.
     */
    data: XOR<KategoriUpdateManyMutationInput, KategoriUncheckedUpdateManyInput>
    /**
     * Filter which Kategoris to update
     */
    where?: KategoriWhereInput
    /**
     * Limit how many Kategoris to update.
     */
    limit?: number
  }

  /**
   * Kategori upsert
   */
  export type KategoriUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * The filter to search for the Kategori to update in case it exists.
     */
    where: KategoriWhereUniqueInput
    /**
     * In case the Kategori found by the `where` argument doesn't exist, create a new Kategori with this data.
     */
    create: XOR<KategoriCreateInput, KategoriUncheckedCreateInput>
    /**
     * In case the Kategori was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KategoriUpdateInput, KategoriUncheckedUpdateInput>
  }

  /**
   * Kategori delete
   */
  export type KategoriDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * Filter which Kategori to delete.
     */
    where: KategoriWhereUniqueInput
  }

  /**
   * Kategori deleteMany
   */
  export type KategoriDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kategoris to delete
     */
    where?: KategoriWhereInput
    /**
     * Limit how many Kategoris to delete.
     */
    limit?: number
  }

  /**
   * Kategori.buku
   */
  export type Kategori$bukuArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buku
     */
    select?: BukuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buku
     */
    omit?: BukuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BukuInclude<ExtArgs> | null
    where?: BukuWhereInput
    orderBy?: BukuOrderByWithRelationInput | BukuOrderByWithRelationInput[]
    cursor?: BukuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BukuScalarFieldEnum | BukuScalarFieldEnum[]
  }

  /**
   * Kategori without action
   */
  export type KategoriDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
  }


  /**
   * Model Buku
   */

  export type AggregateBuku = {
    _count: BukuCountAggregateOutputType | null
    _avg: BukuAvgAggregateOutputType | null
    _sum: BukuSumAggregateOutputType | null
    _min: BukuMinAggregateOutputType | null
    _max: BukuMaxAggregateOutputType | null
  }

  export type BukuAvgAggregateOutputType = {
    id_buku: number | null
    id_kategori: number | null
    tahun_terbit: number | null
    stok: number | null
    rating_rata: Decimal | null
  }

  export type BukuSumAggregateOutputType = {
    id_buku: number | null
    id_kategori: number | null
    tahun_terbit: number | null
    stok: number | null
    rating_rata: Decimal | null
  }

  export type BukuMinAggregateOutputType = {
    id_buku: number | null
    id_kategori: number | null
    judul: string | null
    penulis: string | null
    penerbit: string | null
    tahun_terbit: number | null
    isbn: string | null
    stok: number | null
    cover_buku: string | null
    sinopsis: string | null
    rating_rata: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BukuMaxAggregateOutputType = {
    id_buku: number | null
    id_kategori: number | null
    judul: string | null
    penulis: string | null
    penerbit: string | null
    tahun_terbit: number | null
    isbn: string | null
    stok: number | null
    cover_buku: string | null
    sinopsis: string | null
    rating_rata: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BukuCountAggregateOutputType = {
    id_buku: number
    id_kategori: number
    judul: number
    penulis: number
    penerbit: number
    tahun_terbit: number
    isbn: number
    stok: number
    cover_buku: number
    sinopsis: number
    rating_rata: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BukuAvgAggregateInputType = {
    id_buku?: true
    id_kategori?: true
    tahun_terbit?: true
    stok?: true
    rating_rata?: true
  }

  export type BukuSumAggregateInputType = {
    id_buku?: true
    id_kategori?: true
    tahun_terbit?: true
    stok?: true
    rating_rata?: true
  }

  export type BukuMinAggregateInputType = {
    id_buku?: true
    id_kategori?: true
    judul?: true
    penulis?: true
    penerbit?: true
    tahun_terbit?: true
    isbn?: true
    stok?: true
    cover_buku?: true
    sinopsis?: true
    rating_rata?: true
    created_at?: true
    updated_at?: true
  }

  export type BukuMaxAggregateInputType = {
    id_buku?: true
    id_kategori?: true
    judul?: true
    penulis?: true
    penerbit?: true
    tahun_terbit?: true
    isbn?: true
    stok?: true
    cover_buku?: true
    sinopsis?: true
    rating_rata?: true
    created_at?: true
    updated_at?: true
  }

  export type BukuCountAggregateInputType = {
    id_buku?: true
    id_kategori?: true
    judul?: true
    penulis?: true
    penerbit?: true
    tahun_terbit?: true
    isbn?: true
    stok?: true
    cover_buku?: true
    sinopsis?: true
    rating_rata?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BukuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Buku to aggregate.
     */
    where?: BukuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bukus to fetch.
     */
    orderBy?: BukuOrderByWithRelationInput | BukuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BukuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bukus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bukus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bukus
    **/
    _count?: true | BukuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BukuAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BukuSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BukuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BukuMaxAggregateInputType
  }

  export type GetBukuAggregateType<T extends BukuAggregateArgs> = {
        [P in keyof T & keyof AggregateBuku]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBuku[P]>
      : GetScalarType<T[P], AggregateBuku[P]>
  }




  export type BukuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BukuWhereInput
    orderBy?: BukuOrderByWithAggregationInput | BukuOrderByWithAggregationInput[]
    by: BukuScalarFieldEnum[] | BukuScalarFieldEnum
    having?: BukuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BukuCountAggregateInputType | true
    _avg?: BukuAvgAggregateInputType
    _sum?: BukuSumAggregateInputType
    _min?: BukuMinAggregateInputType
    _max?: BukuMaxAggregateInputType
  }

  export type BukuGroupByOutputType = {
    id_buku: number
    id_kategori: number
    judul: string
    penulis: string
    penerbit: string
    tahun_terbit: number
    isbn: string
    stok: number
    cover_buku: string
    sinopsis: string
    rating_rata: Decimal
    created_at: Date
    updated_at: Date
    _count: BukuCountAggregateOutputType | null
    _avg: BukuAvgAggregateOutputType | null
    _sum: BukuSumAggregateOutputType | null
    _min: BukuMinAggregateOutputType | null
    _max: BukuMaxAggregateOutputType | null
  }

  type GetBukuGroupByPayload<T extends BukuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BukuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BukuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BukuGroupByOutputType[P]>
            : GetScalarType<T[P], BukuGroupByOutputType[P]>
        }
      >
    >


  export type BukuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_buku?: boolean
    id_kategori?: boolean
    judul?: boolean
    penulis?: boolean
    penerbit?: boolean
    tahun_terbit?: boolean
    isbn?: boolean
    stok?: boolean
    cover_buku?: boolean
    sinopsis?: boolean
    rating_rata?: boolean
    created_at?: boolean
    updated_at?: boolean
    kategori?: boolean | KategoriDefaultArgs<ExtArgs>
    peminjaman?: boolean | Buku$peminjamanArgs<ExtArgs>
    ratings?: boolean | Buku$ratingsArgs<ExtArgs>
    favorit?: boolean | Buku$favoritArgs<ExtArgs>
    _count?: boolean | BukuCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["buku"]>

  export type BukuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_buku?: boolean
    id_kategori?: boolean
    judul?: boolean
    penulis?: boolean
    penerbit?: boolean
    tahun_terbit?: boolean
    isbn?: boolean
    stok?: boolean
    cover_buku?: boolean
    sinopsis?: boolean
    rating_rata?: boolean
    created_at?: boolean
    updated_at?: boolean
    kategori?: boolean | KategoriDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["buku"]>

  export type BukuSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_buku?: boolean
    id_kategori?: boolean
    judul?: boolean
    penulis?: boolean
    penerbit?: boolean
    tahun_terbit?: boolean
    isbn?: boolean
    stok?: boolean
    cover_buku?: boolean
    sinopsis?: boolean
    rating_rata?: boolean
    created_at?: boolean
    updated_at?: boolean
    kategori?: boolean | KategoriDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["buku"]>

  export type BukuSelectScalar = {
    id_buku?: boolean
    id_kategori?: boolean
    judul?: boolean
    penulis?: boolean
    penerbit?: boolean
    tahun_terbit?: boolean
    isbn?: boolean
    stok?: boolean
    cover_buku?: boolean
    sinopsis?: boolean
    rating_rata?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type BukuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_buku" | "id_kategori" | "judul" | "penulis" | "penerbit" | "tahun_terbit" | "isbn" | "stok" | "cover_buku" | "sinopsis" | "rating_rata" | "created_at" | "updated_at", ExtArgs["result"]["buku"]>
  export type BukuInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kategori?: boolean | KategoriDefaultArgs<ExtArgs>
    peminjaman?: boolean | Buku$peminjamanArgs<ExtArgs>
    ratings?: boolean | Buku$ratingsArgs<ExtArgs>
    favorit?: boolean | Buku$favoritArgs<ExtArgs>
    _count?: boolean | BukuCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BukuIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kategori?: boolean | KategoriDefaultArgs<ExtArgs>
  }
  export type BukuIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kategori?: boolean | KategoriDefaultArgs<ExtArgs>
  }

  export type $BukuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Buku"
    objects: {
      kategori: Prisma.$KategoriPayload<ExtArgs>
      peminjaman: Prisma.$PeminjamanPayload<ExtArgs>[]
      ratings: Prisma.$RatingPayload<ExtArgs>[]
      favorit: Prisma.$FavoritPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_buku: number
      id_kategori: number
      judul: string
      penulis: string
      penerbit: string
      tahun_terbit: number
      isbn: string
      stok: number
      cover_buku: string
      sinopsis: string
      rating_rata: Prisma.Decimal
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["buku"]>
    composites: {}
  }

  type BukuGetPayload<S extends boolean | null | undefined | BukuDefaultArgs> = $Result.GetResult<Prisma.$BukuPayload, S>

  type BukuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BukuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BukuCountAggregateInputType | true
    }

  export interface BukuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Buku'], meta: { name: 'Buku' } }
    /**
     * Find zero or one Buku that matches the filter.
     * @param {BukuFindUniqueArgs} args - Arguments to find a Buku
     * @example
     * // Get one Buku
     * const buku = await prisma.buku.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BukuFindUniqueArgs>(args: SelectSubset<T, BukuFindUniqueArgs<ExtArgs>>): Prisma__BukuClient<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Buku that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BukuFindUniqueOrThrowArgs} args - Arguments to find a Buku
     * @example
     * // Get one Buku
     * const buku = await prisma.buku.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BukuFindUniqueOrThrowArgs>(args: SelectSubset<T, BukuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BukuClient<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Buku that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BukuFindFirstArgs} args - Arguments to find a Buku
     * @example
     * // Get one Buku
     * const buku = await prisma.buku.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BukuFindFirstArgs>(args?: SelectSubset<T, BukuFindFirstArgs<ExtArgs>>): Prisma__BukuClient<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Buku that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BukuFindFirstOrThrowArgs} args - Arguments to find a Buku
     * @example
     * // Get one Buku
     * const buku = await prisma.buku.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BukuFindFirstOrThrowArgs>(args?: SelectSubset<T, BukuFindFirstOrThrowArgs<ExtArgs>>): Prisma__BukuClient<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bukus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BukuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bukus
     * const bukus = await prisma.buku.findMany()
     * 
     * // Get first 10 Bukus
     * const bukus = await prisma.buku.findMany({ take: 10 })
     * 
     * // Only select the `id_buku`
     * const bukuWithId_bukuOnly = await prisma.buku.findMany({ select: { id_buku: true } })
     * 
     */
    findMany<T extends BukuFindManyArgs>(args?: SelectSubset<T, BukuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Buku.
     * @param {BukuCreateArgs} args - Arguments to create a Buku.
     * @example
     * // Create one Buku
     * const Buku = await prisma.buku.create({
     *   data: {
     *     // ... data to create a Buku
     *   }
     * })
     * 
     */
    create<T extends BukuCreateArgs>(args: SelectSubset<T, BukuCreateArgs<ExtArgs>>): Prisma__BukuClient<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bukus.
     * @param {BukuCreateManyArgs} args - Arguments to create many Bukus.
     * @example
     * // Create many Bukus
     * const buku = await prisma.buku.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BukuCreateManyArgs>(args?: SelectSubset<T, BukuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bukus and returns the data saved in the database.
     * @param {BukuCreateManyAndReturnArgs} args - Arguments to create many Bukus.
     * @example
     * // Create many Bukus
     * const buku = await prisma.buku.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bukus and only return the `id_buku`
     * const bukuWithId_bukuOnly = await prisma.buku.createManyAndReturn({
     *   select: { id_buku: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BukuCreateManyAndReturnArgs>(args?: SelectSubset<T, BukuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Buku.
     * @param {BukuDeleteArgs} args - Arguments to delete one Buku.
     * @example
     * // Delete one Buku
     * const Buku = await prisma.buku.delete({
     *   where: {
     *     // ... filter to delete one Buku
     *   }
     * })
     * 
     */
    delete<T extends BukuDeleteArgs>(args: SelectSubset<T, BukuDeleteArgs<ExtArgs>>): Prisma__BukuClient<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Buku.
     * @param {BukuUpdateArgs} args - Arguments to update one Buku.
     * @example
     * // Update one Buku
     * const buku = await prisma.buku.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BukuUpdateArgs>(args: SelectSubset<T, BukuUpdateArgs<ExtArgs>>): Prisma__BukuClient<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bukus.
     * @param {BukuDeleteManyArgs} args - Arguments to filter Bukus to delete.
     * @example
     * // Delete a few Bukus
     * const { count } = await prisma.buku.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BukuDeleteManyArgs>(args?: SelectSubset<T, BukuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bukus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BukuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bukus
     * const buku = await prisma.buku.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BukuUpdateManyArgs>(args: SelectSubset<T, BukuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bukus and returns the data updated in the database.
     * @param {BukuUpdateManyAndReturnArgs} args - Arguments to update many Bukus.
     * @example
     * // Update many Bukus
     * const buku = await prisma.buku.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bukus and only return the `id_buku`
     * const bukuWithId_bukuOnly = await prisma.buku.updateManyAndReturn({
     *   select: { id_buku: true },
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
    updateManyAndReturn<T extends BukuUpdateManyAndReturnArgs>(args: SelectSubset<T, BukuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Buku.
     * @param {BukuUpsertArgs} args - Arguments to update or create a Buku.
     * @example
     * // Update or create a Buku
     * const buku = await prisma.buku.upsert({
     *   create: {
     *     // ... data to create a Buku
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Buku we want to update
     *   }
     * })
     */
    upsert<T extends BukuUpsertArgs>(args: SelectSubset<T, BukuUpsertArgs<ExtArgs>>): Prisma__BukuClient<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bukus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BukuCountArgs} args - Arguments to filter Bukus to count.
     * @example
     * // Count the number of Bukus
     * const count = await prisma.buku.count({
     *   where: {
     *     // ... the filter for the Bukus we want to count
     *   }
     * })
    **/
    count<T extends BukuCountArgs>(
      args?: Subset<T, BukuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BukuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Buku.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BukuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BukuAggregateArgs>(args: Subset<T, BukuAggregateArgs>): Prisma.PrismaPromise<GetBukuAggregateType<T>>

    /**
     * Group by Buku.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BukuGroupByArgs} args - Group by arguments.
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
      T extends BukuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BukuGroupByArgs['orderBy'] }
        : { orderBy?: BukuGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BukuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBukuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Buku model
   */
  readonly fields: BukuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Buku.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BukuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    kategori<T extends KategoriDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KategoriDefaultArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    peminjaman<T extends Buku$peminjamanArgs<ExtArgs> = {}>(args?: Subset<T, Buku$peminjamanArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ratings<T extends Buku$ratingsArgs<ExtArgs> = {}>(args?: Subset<T, Buku$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorit<T extends Buku$favoritArgs<ExtArgs> = {}>(args?: Subset<T, Buku$favoritArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Buku model
   */
  interface BukuFieldRefs {
    readonly id_buku: FieldRef<"Buku", 'Int'>
    readonly id_kategori: FieldRef<"Buku", 'Int'>
    readonly judul: FieldRef<"Buku", 'String'>
    readonly penulis: FieldRef<"Buku", 'String'>
    readonly penerbit: FieldRef<"Buku", 'String'>
    readonly tahun_terbit: FieldRef<"Buku", 'Int'>
    readonly isbn: FieldRef<"Buku", 'String'>
    readonly stok: FieldRef<"Buku", 'Int'>
    readonly cover_buku: FieldRef<"Buku", 'String'>
    readonly sinopsis: FieldRef<"Buku", 'String'>
    readonly rating_rata: FieldRef<"Buku", 'Decimal'>
    readonly created_at: FieldRef<"Buku", 'DateTime'>
    readonly updated_at: FieldRef<"Buku", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Buku findUnique
   */
  export type BukuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buku
     */
    select?: BukuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buku
     */
    omit?: BukuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BukuInclude<ExtArgs> | null
    /**
     * Filter, which Buku to fetch.
     */
    where: BukuWhereUniqueInput
  }

  /**
   * Buku findUniqueOrThrow
   */
  export type BukuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buku
     */
    select?: BukuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buku
     */
    omit?: BukuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BukuInclude<ExtArgs> | null
    /**
     * Filter, which Buku to fetch.
     */
    where: BukuWhereUniqueInput
  }

  /**
   * Buku findFirst
   */
  export type BukuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buku
     */
    select?: BukuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buku
     */
    omit?: BukuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BukuInclude<ExtArgs> | null
    /**
     * Filter, which Buku to fetch.
     */
    where?: BukuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bukus to fetch.
     */
    orderBy?: BukuOrderByWithRelationInput | BukuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bukus.
     */
    cursor?: BukuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bukus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bukus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bukus.
     */
    distinct?: BukuScalarFieldEnum | BukuScalarFieldEnum[]
  }

  /**
   * Buku findFirstOrThrow
   */
  export type BukuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buku
     */
    select?: BukuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buku
     */
    omit?: BukuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BukuInclude<ExtArgs> | null
    /**
     * Filter, which Buku to fetch.
     */
    where?: BukuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bukus to fetch.
     */
    orderBy?: BukuOrderByWithRelationInput | BukuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bukus.
     */
    cursor?: BukuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bukus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bukus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bukus.
     */
    distinct?: BukuScalarFieldEnum | BukuScalarFieldEnum[]
  }

  /**
   * Buku findMany
   */
  export type BukuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buku
     */
    select?: BukuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buku
     */
    omit?: BukuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BukuInclude<ExtArgs> | null
    /**
     * Filter, which Bukus to fetch.
     */
    where?: BukuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bukus to fetch.
     */
    orderBy?: BukuOrderByWithRelationInput | BukuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bukus.
     */
    cursor?: BukuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bukus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bukus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bukus.
     */
    distinct?: BukuScalarFieldEnum | BukuScalarFieldEnum[]
  }

  /**
   * Buku create
   */
  export type BukuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buku
     */
    select?: BukuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buku
     */
    omit?: BukuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BukuInclude<ExtArgs> | null
    /**
     * The data needed to create a Buku.
     */
    data: XOR<BukuCreateInput, BukuUncheckedCreateInput>
  }

  /**
   * Buku createMany
   */
  export type BukuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bukus.
     */
    data: BukuCreateManyInput | BukuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Buku createManyAndReturn
   */
  export type BukuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buku
     */
    select?: BukuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Buku
     */
    omit?: BukuOmit<ExtArgs> | null
    /**
     * The data used to create many Bukus.
     */
    data: BukuCreateManyInput | BukuCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BukuIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Buku update
   */
  export type BukuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buku
     */
    select?: BukuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buku
     */
    omit?: BukuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BukuInclude<ExtArgs> | null
    /**
     * The data needed to update a Buku.
     */
    data: XOR<BukuUpdateInput, BukuUncheckedUpdateInput>
    /**
     * Choose, which Buku to update.
     */
    where: BukuWhereUniqueInput
  }

  /**
   * Buku updateMany
   */
  export type BukuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bukus.
     */
    data: XOR<BukuUpdateManyMutationInput, BukuUncheckedUpdateManyInput>
    /**
     * Filter which Bukus to update
     */
    where?: BukuWhereInput
    /**
     * Limit how many Bukus to update.
     */
    limit?: number
  }

  /**
   * Buku updateManyAndReturn
   */
  export type BukuUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buku
     */
    select?: BukuSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Buku
     */
    omit?: BukuOmit<ExtArgs> | null
    /**
     * The data used to update Bukus.
     */
    data: XOR<BukuUpdateManyMutationInput, BukuUncheckedUpdateManyInput>
    /**
     * Filter which Bukus to update
     */
    where?: BukuWhereInput
    /**
     * Limit how many Bukus to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BukuIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Buku upsert
   */
  export type BukuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buku
     */
    select?: BukuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buku
     */
    omit?: BukuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BukuInclude<ExtArgs> | null
    /**
     * The filter to search for the Buku to update in case it exists.
     */
    where: BukuWhereUniqueInput
    /**
     * In case the Buku found by the `where` argument doesn't exist, create a new Buku with this data.
     */
    create: XOR<BukuCreateInput, BukuUncheckedCreateInput>
    /**
     * In case the Buku was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BukuUpdateInput, BukuUncheckedUpdateInput>
  }

  /**
   * Buku delete
   */
  export type BukuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buku
     */
    select?: BukuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buku
     */
    omit?: BukuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BukuInclude<ExtArgs> | null
    /**
     * Filter which Buku to delete.
     */
    where: BukuWhereUniqueInput
  }

  /**
   * Buku deleteMany
   */
  export type BukuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bukus to delete
     */
    where?: BukuWhereInput
    /**
     * Limit how many Bukus to delete.
     */
    limit?: number
  }

  /**
   * Buku.peminjaman
   */
  export type Buku$peminjamanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanInclude<ExtArgs> | null
    where?: PeminjamanWhereInput
    orderBy?: PeminjamanOrderByWithRelationInput | PeminjamanOrderByWithRelationInput[]
    cursor?: PeminjamanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PeminjamanScalarFieldEnum | PeminjamanScalarFieldEnum[]
  }

  /**
   * Buku.ratings
   */
  export type Buku$ratingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    cursor?: RatingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Buku.favorit
   */
  export type Buku$favoritArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritInclude<ExtArgs> | null
    where?: FavoritWhereInput
    orderBy?: FavoritOrderByWithRelationInput | FavoritOrderByWithRelationInput[]
    cursor?: FavoritWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoritScalarFieldEnum | FavoritScalarFieldEnum[]
  }

  /**
   * Buku without action
   */
  export type BukuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buku
     */
    select?: BukuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buku
     */
    omit?: BukuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BukuInclude<ExtArgs> | null
  }


  /**
   * Model Peminjaman
   */

  export type AggregatePeminjaman = {
    _count: PeminjamanCountAggregateOutputType | null
    _avg: PeminjamanAvgAggregateOutputType | null
    _sum: PeminjamanSumAggregateOutputType | null
    _min: PeminjamanMinAggregateOutputType | null
    _max: PeminjamanMaxAggregateOutputType | null
  }

  export type PeminjamanAvgAggregateOutputType = {
    id_peminjaman: number | null
    id_buku: number | null
  }

  export type PeminjamanSumAggregateOutputType = {
    id_peminjaman: number | null
    id_buku: number | null
  }

  export type PeminjamanMinAggregateOutputType = {
    id_peminjaman: number | null
    id_user: string | null
    id_buku: number | null
    kode_peminjaman: string | null
    tanggal_pinjam: Date | null
    tanggal_kembali: Date | null
    tanggal_dikembalikan: Date | null
    status: $Enums.StatusPeminjaman | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PeminjamanMaxAggregateOutputType = {
    id_peminjaman: number | null
    id_user: string | null
    id_buku: number | null
    kode_peminjaman: string | null
    tanggal_pinjam: Date | null
    tanggal_kembali: Date | null
    tanggal_dikembalikan: Date | null
    status: $Enums.StatusPeminjaman | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PeminjamanCountAggregateOutputType = {
    id_peminjaman: number
    id_user: number
    id_buku: number
    kode_peminjaman: number
    tanggal_pinjam: number
    tanggal_kembali: number
    tanggal_dikembalikan: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PeminjamanAvgAggregateInputType = {
    id_peminjaman?: true
    id_buku?: true
  }

  export type PeminjamanSumAggregateInputType = {
    id_peminjaman?: true
    id_buku?: true
  }

  export type PeminjamanMinAggregateInputType = {
    id_peminjaman?: true
    id_user?: true
    id_buku?: true
    kode_peminjaman?: true
    tanggal_pinjam?: true
    tanggal_kembali?: true
    tanggal_dikembalikan?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type PeminjamanMaxAggregateInputType = {
    id_peminjaman?: true
    id_user?: true
    id_buku?: true
    kode_peminjaman?: true
    tanggal_pinjam?: true
    tanggal_kembali?: true
    tanggal_dikembalikan?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type PeminjamanCountAggregateInputType = {
    id_peminjaman?: true
    id_user?: true
    id_buku?: true
    kode_peminjaman?: true
    tanggal_pinjam?: true
    tanggal_kembali?: true
    tanggal_dikembalikan?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PeminjamanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Peminjaman to aggregate.
     */
    where?: PeminjamanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Peminjamen to fetch.
     */
    orderBy?: PeminjamanOrderByWithRelationInput | PeminjamanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PeminjamanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Peminjamen from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Peminjamen.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Peminjamen
    **/
    _count?: true | PeminjamanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PeminjamanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PeminjamanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PeminjamanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PeminjamanMaxAggregateInputType
  }

  export type GetPeminjamanAggregateType<T extends PeminjamanAggregateArgs> = {
        [P in keyof T & keyof AggregatePeminjaman]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePeminjaman[P]>
      : GetScalarType<T[P], AggregatePeminjaman[P]>
  }




  export type PeminjamanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeminjamanWhereInput
    orderBy?: PeminjamanOrderByWithAggregationInput | PeminjamanOrderByWithAggregationInput[]
    by: PeminjamanScalarFieldEnum[] | PeminjamanScalarFieldEnum
    having?: PeminjamanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PeminjamanCountAggregateInputType | true
    _avg?: PeminjamanAvgAggregateInputType
    _sum?: PeminjamanSumAggregateInputType
    _min?: PeminjamanMinAggregateInputType
    _max?: PeminjamanMaxAggregateInputType
  }

  export type PeminjamanGroupByOutputType = {
    id_peminjaman: number
    id_user: string
    id_buku: number
    kode_peminjaman: string
    tanggal_pinjam: Date
    tanggal_kembali: Date
    tanggal_dikembalikan: Date | null
    status: $Enums.StatusPeminjaman
    created_at: Date
    updated_at: Date
    _count: PeminjamanCountAggregateOutputType | null
    _avg: PeminjamanAvgAggregateOutputType | null
    _sum: PeminjamanSumAggregateOutputType | null
    _min: PeminjamanMinAggregateOutputType | null
    _max: PeminjamanMaxAggregateOutputType | null
  }

  type GetPeminjamanGroupByPayload<T extends PeminjamanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PeminjamanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PeminjamanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PeminjamanGroupByOutputType[P]>
            : GetScalarType<T[P], PeminjamanGroupByOutputType[P]>
        }
      >
    >


  export type PeminjamanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_peminjaman?: boolean
    id_user?: boolean
    id_buku?: boolean
    kode_peminjaman?: boolean
    tanggal_pinjam?: boolean
    tanggal_kembali?: boolean
    tanggal_dikembalikan?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
    denda?: boolean | Peminjaman$dendaArgs<ExtArgs>
  }, ExtArgs["result"]["peminjaman"]>

  export type PeminjamanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_peminjaman?: boolean
    id_user?: boolean
    id_buku?: boolean
    kode_peminjaman?: boolean
    tanggal_pinjam?: boolean
    tanggal_kembali?: boolean
    tanggal_dikembalikan?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["peminjaman"]>

  export type PeminjamanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_peminjaman?: boolean
    id_user?: boolean
    id_buku?: boolean
    kode_peminjaman?: boolean
    tanggal_pinjam?: boolean
    tanggal_kembali?: boolean
    tanggal_dikembalikan?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["peminjaman"]>

  export type PeminjamanSelectScalar = {
    id_peminjaman?: boolean
    id_user?: boolean
    id_buku?: boolean
    kode_peminjaman?: boolean
    tanggal_pinjam?: boolean
    tanggal_kembali?: boolean
    tanggal_dikembalikan?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PeminjamanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_peminjaman" | "id_user" | "id_buku" | "kode_peminjaman" | "tanggal_pinjam" | "tanggal_kembali" | "tanggal_dikembalikan" | "status" | "created_at" | "updated_at", ExtArgs["result"]["peminjaman"]>
  export type PeminjamanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
    denda?: boolean | Peminjaman$dendaArgs<ExtArgs>
  }
  export type PeminjamanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }
  export type PeminjamanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }

  export type $PeminjamanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Peminjaman"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      buku: Prisma.$BukuPayload<ExtArgs>
      denda: Prisma.$DendaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id_peminjaman: number
      id_user: string
      id_buku: number
      kode_peminjaman: string
      tanggal_pinjam: Date
      tanggal_kembali: Date
      tanggal_dikembalikan: Date | null
      status: $Enums.StatusPeminjaman
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["peminjaman"]>
    composites: {}
  }

  type PeminjamanGetPayload<S extends boolean | null | undefined | PeminjamanDefaultArgs> = $Result.GetResult<Prisma.$PeminjamanPayload, S>

  type PeminjamanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PeminjamanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PeminjamanCountAggregateInputType | true
    }

  export interface PeminjamanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Peminjaman'], meta: { name: 'Peminjaman' } }
    /**
     * Find zero or one Peminjaman that matches the filter.
     * @param {PeminjamanFindUniqueArgs} args - Arguments to find a Peminjaman
     * @example
     * // Get one Peminjaman
     * const peminjaman = await prisma.peminjaman.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PeminjamanFindUniqueArgs>(args: SelectSubset<T, PeminjamanFindUniqueArgs<ExtArgs>>): Prisma__PeminjamanClient<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Peminjaman that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PeminjamanFindUniqueOrThrowArgs} args - Arguments to find a Peminjaman
     * @example
     * // Get one Peminjaman
     * const peminjaman = await prisma.peminjaman.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PeminjamanFindUniqueOrThrowArgs>(args: SelectSubset<T, PeminjamanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PeminjamanClient<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Peminjaman that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeminjamanFindFirstArgs} args - Arguments to find a Peminjaman
     * @example
     * // Get one Peminjaman
     * const peminjaman = await prisma.peminjaman.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PeminjamanFindFirstArgs>(args?: SelectSubset<T, PeminjamanFindFirstArgs<ExtArgs>>): Prisma__PeminjamanClient<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Peminjaman that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeminjamanFindFirstOrThrowArgs} args - Arguments to find a Peminjaman
     * @example
     * // Get one Peminjaman
     * const peminjaman = await prisma.peminjaman.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PeminjamanFindFirstOrThrowArgs>(args?: SelectSubset<T, PeminjamanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PeminjamanClient<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Peminjamen that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeminjamanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Peminjamen
     * const peminjamen = await prisma.peminjaman.findMany()
     * 
     * // Get first 10 Peminjamen
     * const peminjamen = await prisma.peminjaman.findMany({ take: 10 })
     * 
     * // Only select the `id_peminjaman`
     * const peminjamanWithId_peminjamanOnly = await prisma.peminjaman.findMany({ select: { id_peminjaman: true } })
     * 
     */
    findMany<T extends PeminjamanFindManyArgs>(args?: SelectSubset<T, PeminjamanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Peminjaman.
     * @param {PeminjamanCreateArgs} args - Arguments to create a Peminjaman.
     * @example
     * // Create one Peminjaman
     * const Peminjaman = await prisma.peminjaman.create({
     *   data: {
     *     // ... data to create a Peminjaman
     *   }
     * })
     * 
     */
    create<T extends PeminjamanCreateArgs>(args: SelectSubset<T, PeminjamanCreateArgs<ExtArgs>>): Prisma__PeminjamanClient<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Peminjamen.
     * @param {PeminjamanCreateManyArgs} args - Arguments to create many Peminjamen.
     * @example
     * // Create many Peminjamen
     * const peminjaman = await prisma.peminjaman.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PeminjamanCreateManyArgs>(args?: SelectSubset<T, PeminjamanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Peminjamen and returns the data saved in the database.
     * @param {PeminjamanCreateManyAndReturnArgs} args - Arguments to create many Peminjamen.
     * @example
     * // Create many Peminjamen
     * const peminjaman = await prisma.peminjaman.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Peminjamen and only return the `id_peminjaman`
     * const peminjamanWithId_peminjamanOnly = await prisma.peminjaman.createManyAndReturn({
     *   select: { id_peminjaman: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PeminjamanCreateManyAndReturnArgs>(args?: SelectSubset<T, PeminjamanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Peminjaman.
     * @param {PeminjamanDeleteArgs} args - Arguments to delete one Peminjaman.
     * @example
     * // Delete one Peminjaman
     * const Peminjaman = await prisma.peminjaman.delete({
     *   where: {
     *     // ... filter to delete one Peminjaman
     *   }
     * })
     * 
     */
    delete<T extends PeminjamanDeleteArgs>(args: SelectSubset<T, PeminjamanDeleteArgs<ExtArgs>>): Prisma__PeminjamanClient<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Peminjaman.
     * @param {PeminjamanUpdateArgs} args - Arguments to update one Peminjaman.
     * @example
     * // Update one Peminjaman
     * const peminjaman = await prisma.peminjaman.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PeminjamanUpdateArgs>(args: SelectSubset<T, PeminjamanUpdateArgs<ExtArgs>>): Prisma__PeminjamanClient<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Peminjamen.
     * @param {PeminjamanDeleteManyArgs} args - Arguments to filter Peminjamen to delete.
     * @example
     * // Delete a few Peminjamen
     * const { count } = await prisma.peminjaman.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PeminjamanDeleteManyArgs>(args?: SelectSubset<T, PeminjamanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Peminjamen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeminjamanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Peminjamen
     * const peminjaman = await prisma.peminjaman.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PeminjamanUpdateManyArgs>(args: SelectSubset<T, PeminjamanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Peminjamen and returns the data updated in the database.
     * @param {PeminjamanUpdateManyAndReturnArgs} args - Arguments to update many Peminjamen.
     * @example
     * // Update many Peminjamen
     * const peminjaman = await prisma.peminjaman.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Peminjamen and only return the `id_peminjaman`
     * const peminjamanWithId_peminjamanOnly = await prisma.peminjaman.updateManyAndReturn({
     *   select: { id_peminjaman: true },
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
    updateManyAndReturn<T extends PeminjamanUpdateManyAndReturnArgs>(args: SelectSubset<T, PeminjamanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Peminjaman.
     * @param {PeminjamanUpsertArgs} args - Arguments to update or create a Peminjaman.
     * @example
     * // Update or create a Peminjaman
     * const peminjaman = await prisma.peminjaman.upsert({
     *   create: {
     *     // ... data to create a Peminjaman
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Peminjaman we want to update
     *   }
     * })
     */
    upsert<T extends PeminjamanUpsertArgs>(args: SelectSubset<T, PeminjamanUpsertArgs<ExtArgs>>): Prisma__PeminjamanClient<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Peminjamen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeminjamanCountArgs} args - Arguments to filter Peminjamen to count.
     * @example
     * // Count the number of Peminjamen
     * const count = await prisma.peminjaman.count({
     *   where: {
     *     // ... the filter for the Peminjamen we want to count
     *   }
     * })
    **/
    count<T extends PeminjamanCountArgs>(
      args?: Subset<T, PeminjamanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PeminjamanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Peminjaman.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeminjamanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PeminjamanAggregateArgs>(args: Subset<T, PeminjamanAggregateArgs>): Prisma.PrismaPromise<GetPeminjamanAggregateType<T>>

    /**
     * Group by Peminjaman.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeminjamanGroupByArgs} args - Group by arguments.
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
      T extends PeminjamanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PeminjamanGroupByArgs['orderBy'] }
        : { orderBy?: PeminjamanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PeminjamanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPeminjamanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Peminjaman model
   */
  readonly fields: PeminjamanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Peminjaman.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PeminjamanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    buku<T extends BukuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BukuDefaultArgs<ExtArgs>>): Prisma__BukuClient<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    denda<T extends Peminjaman$dendaArgs<ExtArgs> = {}>(args?: Subset<T, Peminjaman$dendaArgs<ExtArgs>>): Prisma__DendaClient<$Result.GetResult<Prisma.$DendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Peminjaman model
   */
  interface PeminjamanFieldRefs {
    readonly id_peminjaman: FieldRef<"Peminjaman", 'Int'>
    readonly id_user: FieldRef<"Peminjaman", 'String'>
    readonly id_buku: FieldRef<"Peminjaman", 'Int'>
    readonly kode_peminjaman: FieldRef<"Peminjaman", 'String'>
    readonly tanggal_pinjam: FieldRef<"Peminjaman", 'DateTime'>
    readonly tanggal_kembali: FieldRef<"Peminjaman", 'DateTime'>
    readonly tanggal_dikembalikan: FieldRef<"Peminjaman", 'DateTime'>
    readonly status: FieldRef<"Peminjaman", 'StatusPeminjaman'>
    readonly created_at: FieldRef<"Peminjaman", 'DateTime'>
    readonly updated_at: FieldRef<"Peminjaman", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Peminjaman findUnique
   */
  export type PeminjamanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanInclude<ExtArgs> | null
    /**
     * Filter, which Peminjaman to fetch.
     */
    where: PeminjamanWhereUniqueInput
  }

  /**
   * Peminjaman findUniqueOrThrow
   */
  export type PeminjamanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanInclude<ExtArgs> | null
    /**
     * Filter, which Peminjaman to fetch.
     */
    where: PeminjamanWhereUniqueInput
  }

  /**
   * Peminjaman findFirst
   */
  export type PeminjamanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanInclude<ExtArgs> | null
    /**
     * Filter, which Peminjaman to fetch.
     */
    where?: PeminjamanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Peminjamen to fetch.
     */
    orderBy?: PeminjamanOrderByWithRelationInput | PeminjamanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Peminjamen.
     */
    cursor?: PeminjamanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Peminjamen from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Peminjamen.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Peminjamen.
     */
    distinct?: PeminjamanScalarFieldEnum | PeminjamanScalarFieldEnum[]
  }

  /**
   * Peminjaman findFirstOrThrow
   */
  export type PeminjamanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanInclude<ExtArgs> | null
    /**
     * Filter, which Peminjaman to fetch.
     */
    where?: PeminjamanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Peminjamen to fetch.
     */
    orderBy?: PeminjamanOrderByWithRelationInput | PeminjamanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Peminjamen.
     */
    cursor?: PeminjamanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Peminjamen from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Peminjamen.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Peminjamen.
     */
    distinct?: PeminjamanScalarFieldEnum | PeminjamanScalarFieldEnum[]
  }

  /**
   * Peminjaman findMany
   */
  export type PeminjamanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanInclude<ExtArgs> | null
    /**
     * Filter, which Peminjamen to fetch.
     */
    where?: PeminjamanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Peminjamen to fetch.
     */
    orderBy?: PeminjamanOrderByWithRelationInput | PeminjamanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Peminjamen.
     */
    cursor?: PeminjamanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Peminjamen from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Peminjamen.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Peminjamen.
     */
    distinct?: PeminjamanScalarFieldEnum | PeminjamanScalarFieldEnum[]
  }

  /**
   * Peminjaman create
   */
  export type PeminjamanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanInclude<ExtArgs> | null
    /**
     * The data needed to create a Peminjaman.
     */
    data: XOR<PeminjamanCreateInput, PeminjamanUncheckedCreateInput>
  }

  /**
   * Peminjaman createMany
   */
  export type PeminjamanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Peminjamen.
     */
    data: PeminjamanCreateManyInput | PeminjamanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Peminjaman createManyAndReturn
   */
  export type PeminjamanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * The data used to create many Peminjamen.
     */
    data: PeminjamanCreateManyInput | PeminjamanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Peminjaman update
   */
  export type PeminjamanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanInclude<ExtArgs> | null
    /**
     * The data needed to update a Peminjaman.
     */
    data: XOR<PeminjamanUpdateInput, PeminjamanUncheckedUpdateInput>
    /**
     * Choose, which Peminjaman to update.
     */
    where: PeminjamanWhereUniqueInput
  }

  /**
   * Peminjaman updateMany
   */
  export type PeminjamanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Peminjamen.
     */
    data: XOR<PeminjamanUpdateManyMutationInput, PeminjamanUncheckedUpdateManyInput>
    /**
     * Filter which Peminjamen to update
     */
    where?: PeminjamanWhereInput
    /**
     * Limit how many Peminjamen to update.
     */
    limit?: number
  }

  /**
   * Peminjaman updateManyAndReturn
   */
  export type PeminjamanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * The data used to update Peminjamen.
     */
    data: XOR<PeminjamanUpdateManyMutationInput, PeminjamanUncheckedUpdateManyInput>
    /**
     * Filter which Peminjamen to update
     */
    where?: PeminjamanWhereInput
    /**
     * Limit how many Peminjamen to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Peminjaman upsert
   */
  export type PeminjamanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanInclude<ExtArgs> | null
    /**
     * The filter to search for the Peminjaman to update in case it exists.
     */
    where: PeminjamanWhereUniqueInput
    /**
     * In case the Peminjaman found by the `where` argument doesn't exist, create a new Peminjaman with this data.
     */
    create: XOR<PeminjamanCreateInput, PeminjamanUncheckedCreateInput>
    /**
     * In case the Peminjaman was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PeminjamanUpdateInput, PeminjamanUncheckedUpdateInput>
  }

  /**
   * Peminjaman delete
   */
  export type PeminjamanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanInclude<ExtArgs> | null
    /**
     * Filter which Peminjaman to delete.
     */
    where: PeminjamanWhereUniqueInput
  }

  /**
   * Peminjaman deleteMany
   */
  export type PeminjamanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Peminjamen to delete
     */
    where?: PeminjamanWhereInput
    /**
     * Limit how many Peminjamen to delete.
     */
    limit?: number
  }

  /**
   * Peminjaman.denda
   */
  export type Peminjaman$dendaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Denda
     */
    select?: DendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Denda
     */
    omit?: DendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DendaInclude<ExtArgs> | null
    where?: DendaWhereInput
  }

  /**
   * Peminjaman without action
   */
  export type PeminjamanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peminjaman
     */
    select?: PeminjamanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Peminjaman
     */
    omit?: PeminjamanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeminjamanInclude<ExtArgs> | null
  }


  /**
   * Model Rating
   */

  export type AggregateRating = {
    _count: RatingCountAggregateOutputType | null
    _avg: RatingAvgAggregateOutputType | null
    _sum: RatingSumAggregateOutputType | null
    _min: RatingMinAggregateOutputType | null
    _max: RatingMaxAggregateOutputType | null
  }

  export type RatingAvgAggregateOutputType = {
    id_rating: number | null
    id_buku: number | null
    rating: number | null
  }

  export type RatingSumAggregateOutputType = {
    id_rating: number | null
    id_buku: number | null
    rating: number | null
  }

  export type RatingMinAggregateOutputType = {
    id_rating: number | null
    id_user: string | null
    id_buku: number | null
    rating: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RatingMaxAggregateOutputType = {
    id_rating: number | null
    id_user: string | null
    id_buku: number | null
    rating: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RatingCountAggregateOutputType = {
    id_rating: number
    id_user: number
    id_buku: number
    rating: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type RatingAvgAggregateInputType = {
    id_rating?: true
    id_buku?: true
    rating?: true
  }

  export type RatingSumAggregateInputType = {
    id_rating?: true
    id_buku?: true
    rating?: true
  }

  export type RatingMinAggregateInputType = {
    id_rating?: true
    id_user?: true
    id_buku?: true
    rating?: true
    created_at?: true
    updated_at?: true
  }

  export type RatingMaxAggregateInputType = {
    id_rating?: true
    id_user?: true
    id_buku?: true
    rating?: true
    created_at?: true
    updated_at?: true
  }

  export type RatingCountAggregateInputType = {
    id_rating?: true
    id_user?: true
    id_buku?: true
    rating?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type RatingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rating to aggregate.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ratings
    **/
    _count?: true | RatingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RatingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RatingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RatingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RatingMaxAggregateInputType
  }

  export type GetRatingAggregateType<T extends RatingAggregateArgs> = {
        [P in keyof T & keyof AggregateRating]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRating[P]>
      : GetScalarType<T[P], AggregateRating[P]>
  }




  export type RatingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithAggregationInput | RatingOrderByWithAggregationInput[]
    by: RatingScalarFieldEnum[] | RatingScalarFieldEnum
    having?: RatingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RatingCountAggregateInputType | true
    _avg?: RatingAvgAggregateInputType
    _sum?: RatingSumAggregateInputType
    _min?: RatingMinAggregateInputType
    _max?: RatingMaxAggregateInputType
  }

  export type RatingGroupByOutputType = {
    id_rating: number
    id_user: string
    id_buku: number
    rating: number
    created_at: Date
    updated_at: Date
    _count: RatingCountAggregateOutputType | null
    _avg: RatingAvgAggregateOutputType | null
    _sum: RatingSumAggregateOutputType | null
    _min: RatingMinAggregateOutputType | null
    _max: RatingMaxAggregateOutputType | null
  }

  type GetRatingGroupByPayload<T extends RatingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RatingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RatingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RatingGroupByOutputType[P]>
            : GetScalarType<T[P], RatingGroupByOutputType[P]>
        }
      >
    >


  export type RatingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_rating?: boolean
    id_user?: boolean
    id_buku?: boolean
    rating?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_rating?: boolean
    id_user?: boolean
    id_buku?: boolean
    rating?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_rating?: boolean
    id_user?: boolean
    id_buku?: boolean
    rating?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectScalar = {
    id_rating?: boolean
    id_user?: boolean
    id_buku?: boolean
    rating?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type RatingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_rating" | "id_user" | "id_buku" | "rating" | "created_at" | "updated_at", ExtArgs["result"]["rating"]>
  export type RatingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }
  export type RatingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }
  export type RatingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }

  export type $RatingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rating"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      buku: Prisma.$BukuPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_rating: number
      id_user: string
      id_buku: number
      rating: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["rating"]>
    composites: {}
  }

  type RatingGetPayload<S extends boolean | null | undefined | RatingDefaultArgs> = $Result.GetResult<Prisma.$RatingPayload, S>

  type RatingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RatingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RatingCountAggregateInputType | true
    }

  export interface RatingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rating'], meta: { name: 'Rating' } }
    /**
     * Find zero or one Rating that matches the filter.
     * @param {RatingFindUniqueArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RatingFindUniqueArgs>(args: SelectSubset<T, RatingFindUniqueArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rating that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RatingFindUniqueOrThrowArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RatingFindUniqueOrThrowArgs>(args: SelectSubset<T, RatingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rating that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindFirstArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RatingFindFirstArgs>(args?: SelectSubset<T, RatingFindFirstArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rating that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindFirstOrThrowArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RatingFindFirstOrThrowArgs>(args?: SelectSubset<T, RatingFindFirstOrThrowArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ratings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ratings
     * const ratings = await prisma.rating.findMany()
     * 
     * // Get first 10 Ratings
     * const ratings = await prisma.rating.findMany({ take: 10 })
     * 
     * // Only select the `id_rating`
     * const ratingWithId_ratingOnly = await prisma.rating.findMany({ select: { id_rating: true } })
     * 
     */
    findMany<T extends RatingFindManyArgs>(args?: SelectSubset<T, RatingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rating.
     * @param {RatingCreateArgs} args - Arguments to create a Rating.
     * @example
     * // Create one Rating
     * const Rating = await prisma.rating.create({
     *   data: {
     *     // ... data to create a Rating
     *   }
     * })
     * 
     */
    create<T extends RatingCreateArgs>(args: SelectSubset<T, RatingCreateArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ratings.
     * @param {RatingCreateManyArgs} args - Arguments to create many Ratings.
     * @example
     * // Create many Ratings
     * const rating = await prisma.rating.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RatingCreateManyArgs>(args?: SelectSubset<T, RatingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ratings and returns the data saved in the database.
     * @param {RatingCreateManyAndReturnArgs} args - Arguments to create many Ratings.
     * @example
     * // Create many Ratings
     * const rating = await prisma.rating.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ratings and only return the `id_rating`
     * const ratingWithId_ratingOnly = await prisma.rating.createManyAndReturn({
     *   select: { id_rating: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RatingCreateManyAndReturnArgs>(args?: SelectSubset<T, RatingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rating.
     * @param {RatingDeleteArgs} args - Arguments to delete one Rating.
     * @example
     * // Delete one Rating
     * const Rating = await prisma.rating.delete({
     *   where: {
     *     // ... filter to delete one Rating
     *   }
     * })
     * 
     */
    delete<T extends RatingDeleteArgs>(args: SelectSubset<T, RatingDeleteArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rating.
     * @param {RatingUpdateArgs} args - Arguments to update one Rating.
     * @example
     * // Update one Rating
     * const rating = await prisma.rating.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RatingUpdateArgs>(args: SelectSubset<T, RatingUpdateArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ratings.
     * @param {RatingDeleteManyArgs} args - Arguments to filter Ratings to delete.
     * @example
     * // Delete a few Ratings
     * const { count } = await prisma.rating.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RatingDeleteManyArgs>(args?: SelectSubset<T, RatingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ratings
     * const rating = await prisma.rating.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RatingUpdateManyArgs>(args: SelectSubset<T, RatingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratings and returns the data updated in the database.
     * @param {RatingUpdateManyAndReturnArgs} args - Arguments to update many Ratings.
     * @example
     * // Update many Ratings
     * const rating = await prisma.rating.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ratings and only return the `id_rating`
     * const ratingWithId_ratingOnly = await prisma.rating.updateManyAndReturn({
     *   select: { id_rating: true },
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
    updateManyAndReturn<T extends RatingUpdateManyAndReturnArgs>(args: SelectSubset<T, RatingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rating.
     * @param {RatingUpsertArgs} args - Arguments to update or create a Rating.
     * @example
     * // Update or create a Rating
     * const rating = await prisma.rating.upsert({
     *   create: {
     *     // ... data to create a Rating
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rating we want to update
     *   }
     * })
     */
    upsert<T extends RatingUpsertArgs>(args: SelectSubset<T, RatingUpsertArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingCountArgs} args - Arguments to filter Ratings to count.
     * @example
     * // Count the number of Ratings
     * const count = await prisma.rating.count({
     *   where: {
     *     // ... the filter for the Ratings we want to count
     *   }
     * })
    **/
    count<T extends RatingCountArgs>(
      args?: Subset<T, RatingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RatingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RatingAggregateArgs>(args: Subset<T, RatingAggregateArgs>): Prisma.PrismaPromise<GetRatingAggregateType<T>>

    /**
     * Group by Rating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingGroupByArgs} args - Group by arguments.
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
      T extends RatingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RatingGroupByArgs['orderBy'] }
        : { orderBy?: RatingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RatingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRatingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rating model
   */
  readonly fields: RatingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rating.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RatingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    buku<T extends BukuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BukuDefaultArgs<ExtArgs>>): Prisma__BukuClient<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Rating model
   */
  interface RatingFieldRefs {
    readonly id_rating: FieldRef<"Rating", 'Int'>
    readonly id_user: FieldRef<"Rating", 'String'>
    readonly id_buku: FieldRef<"Rating", 'Int'>
    readonly rating: FieldRef<"Rating", 'Int'>
    readonly created_at: FieldRef<"Rating", 'DateTime'>
    readonly updated_at: FieldRef<"Rating", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Rating findUnique
   */
  export type RatingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating findUniqueOrThrow
   */
  export type RatingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating findFirst
   */
  export type RatingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratings.
     */
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating findFirstOrThrow
   */
  export type RatingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratings.
     */
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating findMany
   */
  export type RatingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Ratings to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratings.
     */
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating create
   */
  export type RatingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The data needed to create a Rating.
     */
    data: XOR<RatingCreateInput, RatingUncheckedCreateInput>
  }

  /**
   * Rating createMany
   */
  export type RatingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ratings.
     */
    data: RatingCreateManyInput | RatingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Rating createManyAndReturn
   */
  export type RatingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * The data used to create many Ratings.
     */
    data: RatingCreateManyInput | RatingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rating update
   */
  export type RatingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The data needed to update a Rating.
     */
    data: XOR<RatingUpdateInput, RatingUncheckedUpdateInput>
    /**
     * Choose, which Rating to update.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating updateMany
   */
  export type RatingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ratings.
     */
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyInput>
    /**
     * Filter which Ratings to update
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to update.
     */
    limit?: number
  }

  /**
   * Rating updateManyAndReturn
   */
  export type RatingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * The data used to update Ratings.
     */
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyInput>
    /**
     * Filter which Ratings to update
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rating upsert
   */
  export type RatingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The filter to search for the Rating to update in case it exists.
     */
    where: RatingWhereUniqueInput
    /**
     * In case the Rating found by the `where` argument doesn't exist, create a new Rating with this data.
     */
    create: XOR<RatingCreateInput, RatingUncheckedCreateInput>
    /**
     * In case the Rating was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RatingUpdateInput, RatingUncheckedUpdateInput>
  }

  /**
   * Rating delete
   */
  export type RatingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter which Rating to delete.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating deleteMany
   */
  export type RatingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ratings to delete
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to delete.
     */
    limit?: number
  }

  /**
   * Rating without action
   */
  export type RatingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
  }


  /**
   * Model Denda
   */

  export type AggregateDenda = {
    _count: DendaCountAggregateOutputType | null
    _avg: DendaAvgAggregateOutputType | null
    _sum: DendaSumAggregateOutputType | null
    _min: DendaMinAggregateOutputType | null
    _max: DendaMaxAggregateOutputType | null
  }

  export type DendaAvgAggregateOutputType = {
    id_denda: number | null
    id_peminjaman: number | null
    jumlah_denda: Decimal | null
    hari_terlambat: number | null
  }

  export type DendaSumAggregateOutputType = {
    id_denda: number | null
    id_peminjaman: number | null
    jumlah_denda: Decimal | null
    hari_terlambat: number | null
  }

  export type DendaMinAggregateOutputType = {
    id_denda: number | null
    id_peminjaman: number | null
    jumlah_denda: Decimal | null
    hari_terlambat: number | null
    keterangan_denda: $Enums.keteranganDenda | null
    status_bayar: $Enums.StatusBayar | null
    tanggal_bayar: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DendaMaxAggregateOutputType = {
    id_denda: number | null
    id_peminjaman: number | null
    jumlah_denda: Decimal | null
    hari_terlambat: number | null
    keterangan_denda: $Enums.keteranganDenda | null
    status_bayar: $Enums.StatusBayar | null
    tanggal_bayar: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DendaCountAggregateOutputType = {
    id_denda: number
    id_peminjaman: number
    jumlah_denda: number
    hari_terlambat: number
    keterangan_denda: number
    status_bayar: number
    tanggal_bayar: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type DendaAvgAggregateInputType = {
    id_denda?: true
    id_peminjaman?: true
    jumlah_denda?: true
    hari_terlambat?: true
  }

  export type DendaSumAggregateInputType = {
    id_denda?: true
    id_peminjaman?: true
    jumlah_denda?: true
    hari_terlambat?: true
  }

  export type DendaMinAggregateInputType = {
    id_denda?: true
    id_peminjaman?: true
    jumlah_denda?: true
    hari_terlambat?: true
    keterangan_denda?: true
    status_bayar?: true
    tanggal_bayar?: true
    created_at?: true
    updated_at?: true
  }

  export type DendaMaxAggregateInputType = {
    id_denda?: true
    id_peminjaman?: true
    jumlah_denda?: true
    hari_terlambat?: true
    keterangan_denda?: true
    status_bayar?: true
    tanggal_bayar?: true
    created_at?: true
    updated_at?: true
  }

  export type DendaCountAggregateInputType = {
    id_denda?: true
    id_peminjaman?: true
    jumlah_denda?: true
    hari_terlambat?: true
    keterangan_denda?: true
    status_bayar?: true
    tanggal_bayar?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type DendaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Denda to aggregate.
     */
    where?: DendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dendas to fetch.
     */
    orderBy?: DendaOrderByWithRelationInput | DendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Dendas
    **/
    _count?: true | DendaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DendaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DendaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DendaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DendaMaxAggregateInputType
  }

  export type GetDendaAggregateType<T extends DendaAggregateArgs> = {
        [P in keyof T & keyof AggregateDenda]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDenda[P]>
      : GetScalarType<T[P], AggregateDenda[P]>
  }




  export type DendaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DendaWhereInput
    orderBy?: DendaOrderByWithAggregationInput | DendaOrderByWithAggregationInput[]
    by: DendaScalarFieldEnum[] | DendaScalarFieldEnum
    having?: DendaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DendaCountAggregateInputType | true
    _avg?: DendaAvgAggregateInputType
    _sum?: DendaSumAggregateInputType
    _min?: DendaMinAggregateInputType
    _max?: DendaMaxAggregateInputType
  }

  export type DendaGroupByOutputType = {
    id_denda: number
    id_peminjaman: number
    jumlah_denda: Decimal
    hari_terlambat: number
    keterangan_denda: $Enums.keteranganDenda
    status_bayar: $Enums.StatusBayar
    tanggal_bayar: Date | null
    created_at: Date
    updated_at: Date
    _count: DendaCountAggregateOutputType | null
    _avg: DendaAvgAggregateOutputType | null
    _sum: DendaSumAggregateOutputType | null
    _min: DendaMinAggregateOutputType | null
    _max: DendaMaxAggregateOutputType | null
  }

  type GetDendaGroupByPayload<T extends DendaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DendaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DendaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DendaGroupByOutputType[P]>
            : GetScalarType<T[P], DendaGroupByOutputType[P]>
        }
      >
    >


  export type DendaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_denda?: boolean
    id_peminjaman?: boolean
    jumlah_denda?: boolean
    hari_terlambat?: boolean
    keterangan_denda?: boolean
    status_bayar?: boolean
    tanggal_bayar?: boolean
    created_at?: boolean
    updated_at?: boolean
    peminjaman?: boolean | PeminjamanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["denda"]>

  export type DendaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_denda?: boolean
    id_peminjaman?: boolean
    jumlah_denda?: boolean
    hari_terlambat?: boolean
    keterangan_denda?: boolean
    status_bayar?: boolean
    tanggal_bayar?: boolean
    created_at?: boolean
    updated_at?: boolean
    peminjaman?: boolean | PeminjamanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["denda"]>

  export type DendaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_denda?: boolean
    id_peminjaman?: boolean
    jumlah_denda?: boolean
    hari_terlambat?: boolean
    keterangan_denda?: boolean
    status_bayar?: boolean
    tanggal_bayar?: boolean
    created_at?: boolean
    updated_at?: boolean
    peminjaman?: boolean | PeminjamanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["denda"]>

  export type DendaSelectScalar = {
    id_denda?: boolean
    id_peminjaman?: boolean
    jumlah_denda?: boolean
    hari_terlambat?: boolean
    keterangan_denda?: boolean
    status_bayar?: boolean
    tanggal_bayar?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type DendaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_denda" | "id_peminjaman" | "jumlah_denda" | "hari_terlambat" | "keterangan_denda" | "status_bayar" | "tanggal_bayar" | "created_at" | "updated_at", ExtArgs["result"]["denda"]>
  export type DendaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    peminjaman?: boolean | PeminjamanDefaultArgs<ExtArgs>
  }
  export type DendaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    peminjaman?: boolean | PeminjamanDefaultArgs<ExtArgs>
  }
  export type DendaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    peminjaman?: boolean | PeminjamanDefaultArgs<ExtArgs>
  }

  export type $DendaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Denda"
    objects: {
      peminjaman: Prisma.$PeminjamanPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_denda: number
      id_peminjaman: number
      jumlah_denda: Prisma.Decimal
      hari_terlambat: number
      keterangan_denda: $Enums.keteranganDenda
      status_bayar: $Enums.StatusBayar
      tanggal_bayar: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["denda"]>
    composites: {}
  }

  type DendaGetPayload<S extends boolean | null | undefined | DendaDefaultArgs> = $Result.GetResult<Prisma.$DendaPayload, S>

  type DendaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DendaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DendaCountAggregateInputType | true
    }

  export interface DendaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Denda'], meta: { name: 'Denda' } }
    /**
     * Find zero or one Denda that matches the filter.
     * @param {DendaFindUniqueArgs} args - Arguments to find a Denda
     * @example
     * // Get one Denda
     * const denda = await prisma.denda.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DendaFindUniqueArgs>(args: SelectSubset<T, DendaFindUniqueArgs<ExtArgs>>): Prisma__DendaClient<$Result.GetResult<Prisma.$DendaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Denda that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DendaFindUniqueOrThrowArgs} args - Arguments to find a Denda
     * @example
     * // Get one Denda
     * const denda = await prisma.denda.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DendaFindUniqueOrThrowArgs>(args: SelectSubset<T, DendaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DendaClient<$Result.GetResult<Prisma.$DendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Denda that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DendaFindFirstArgs} args - Arguments to find a Denda
     * @example
     * // Get one Denda
     * const denda = await prisma.denda.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DendaFindFirstArgs>(args?: SelectSubset<T, DendaFindFirstArgs<ExtArgs>>): Prisma__DendaClient<$Result.GetResult<Prisma.$DendaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Denda that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DendaFindFirstOrThrowArgs} args - Arguments to find a Denda
     * @example
     * // Get one Denda
     * const denda = await prisma.denda.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DendaFindFirstOrThrowArgs>(args?: SelectSubset<T, DendaFindFirstOrThrowArgs<ExtArgs>>): Prisma__DendaClient<$Result.GetResult<Prisma.$DendaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dendas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DendaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dendas
     * const dendas = await prisma.denda.findMany()
     * 
     * // Get first 10 Dendas
     * const dendas = await prisma.denda.findMany({ take: 10 })
     * 
     * // Only select the `id_denda`
     * const dendaWithId_dendaOnly = await prisma.denda.findMany({ select: { id_denda: true } })
     * 
     */
    findMany<T extends DendaFindManyArgs>(args?: SelectSubset<T, DendaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Denda.
     * @param {DendaCreateArgs} args - Arguments to create a Denda.
     * @example
     * // Create one Denda
     * const Denda = await prisma.denda.create({
     *   data: {
     *     // ... data to create a Denda
     *   }
     * })
     * 
     */
    create<T extends DendaCreateArgs>(args: SelectSubset<T, DendaCreateArgs<ExtArgs>>): Prisma__DendaClient<$Result.GetResult<Prisma.$DendaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dendas.
     * @param {DendaCreateManyArgs} args - Arguments to create many Dendas.
     * @example
     * // Create many Dendas
     * const denda = await prisma.denda.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DendaCreateManyArgs>(args?: SelectSubset<T, DendaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dendas and returns the data saved in the database.
     * @param {DendaCreateManyAndReturnArgs} args - Arguments to create many Dendas.
     * @example
     * // Create many Dendas
     * const denda = await prisma.denda.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dendas and only return the `id_denda`
     * const dendaWithId_dendaOnly = await prisma.denda.createManyAndReturn({
     *   select: { id_denda: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DendaCreateManyAndReturnArgs>(args?: SelectSubset<T, DendaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DendaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Denda.
     * @param {DendaDeleteArgs} args - Arguments to delete one Denda.
     * @example
     * // Delete one Denda
     * const Denda = await prisma.denda.delete({
     *   where: {
     *     // ... filter to delete one Denda
     *   }
     * })
     * 
     */
    delete<T extends DendaDeleteArgs>(args: SelectSubset<T, DendaDeleteArgs<ExtArgs>>): Prisma__DendaClient<$Result.GetResult<Prisma.$DendaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Denda.
     * @param {DendaUpdateArgs} args - Arguments to update one Denda.
     * @example
     * // Update one Denda
     * const denda = await prisma.denda.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DendaUpdateArgs>(args: SelectSubset<T, DendaUpdateArgs<ExtArgs>>): Prisma__DendaClient<$Result.GetResult<Prisma.$DendaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dendas.
     * @param {DendaDeleteManyArgs} args - Arguments to filter Dendas to delete.
     * @example
     * // Delete a few Dendas
     * const { count } = await prisma.denda.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DendaDeleteManyArgs>(args?: SelectSubset<T, DendaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DendaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dendas
     * const denda = await prisma.denda.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DendaUpdateManyArgs>(args: SelectSubset<T, DendaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dendas and returns the data updated in the database.
     * @param {DendaUpdateManyAndReturnArgs} args - Arguments to update many Dendas.
     * @example
     * // Update many Dendas
     * const denda = await prisma.denda.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dendas and only return the `id_denda`
     * const dendaWithId_dendaOnly = await prisma.denda.updateManyAndReturn({
     *   select: { id_denda: true },
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
    updateManyAndReturn<T extends DendaUpdateManyAndReturnArgs>(args: SelectSubset<T, DendaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DendaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Denda.
     * @param {DendaUpsertArgs} args - Arguments to update or create a Denda.
     * @example
     * // Update or create a Denda
     * const denda = await prisma.denda.upsert({
     *   create: {
     *     // ... data to create a Denda
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Denda we want to update
     *   }
     * })
     */
    upsert<T extends DendaUpsertArgs>(args: SelectSubset<T, DendaUpsertArgs<ExtArgs>>): Prisma__DendaClient<$Result.GetResult<Prisma.$DendaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DendaCountArgs} args - Arguments to filter Dendas to count.
     * @example
     * // Count the number of Dendas
     * const count = await prisma.denda.count({
     *   where: {
     *     // ... the filter for the Dendas we want to count
     *   }
     * })
    **/
    count<T extends DendaCountArgs>(
      args?: Subset<T, DendaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DendaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Denda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DendaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DendaAggregateArgs>(args: Subset<T, DendaAggregateArgs>): Prisma.PrismaPromise<GetDendaAggregateType<T>>

    /**
     * Group by Denda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DendaGroupByArgs} args - Group by arguments.
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
      T extends DendaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DendaGroupByArgs['orderBy'] }
        : { orderBy?: DendaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DendaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDendaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Denda model
   */
  readonly fields: DendaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Denda.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DendaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    peminjaman<T extends PeminjamanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PeminjamanDefaultArgs<ExtArgs>>): Prisma__PeminjamanClient<$Result.GetResult<Prisma.$PeminjamanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Denda model
   */
  interface DendaFieldRefs {
    readonly id_denda: FieldRef<"Denda", 'Int'>
    readonly id_peminjaman: FieldRef<"Denda", 'Int'>
    readonly jumlah_denda: FieldRef<"Denda", 'Decimal'>
    readonly hari_terlambat: FieldRef<"Denda", 'Int'>
    readonly keterangan_denda: FieldRef<"Denda", 'keteranganDenda'>
    readonly status_bayar: FieldRef<"Denda", 'StatusBayar'>
    readonly tanggal_bayar: FieldRef<"Denda", 'DateTime'>
    readonly created_at: FieldRef<"Denda", 'DateTime'>
    readonly updated_at: FieldRef<"Denda", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Denda findUnique
   */
  export type DendaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Denda
     */
    select?: DendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Denda
     */
    omit?: DendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DendaInclude<ExtArgs> | null
    /**
     * Filter, which Denda to fetch.
     */
    where: DendaWhereUniqueInput
  }

  /**
   * Denda findUniqueOrThrow
   */
  export type DendaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Denda
     */
    select?: DendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Denda
     */
    omit?: DendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DendaInclude<ExtArgs> | null
    /**
     * Filter, which Denda to fetch.
     */
    where: DendaWhereUniqueInput
  }

  /**
   * Denda findFirst
   */
  export type DendaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Denda
     */
    select?: DendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Denda
     */
    omit?: DendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DendaInclude<ExtArgs> | null
    /**
     * Filter, which Denda to fetch.
     */
    where?: DendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dendas to fetch.
     */
    orderBy?: DendaOrderByWithRelationInput | DendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dendas.
     */
    cursor?: DendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dendas.
     */
    distinct?: DendaScalarFieldEnum | DendaScalarFieldEnum[]
  }

  /**
   * Denda findFirstOrThrow
   */
  export type DendaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Denda
     */
    select?: DendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Denda
     */
    omit?: DendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DendaInclude<ExtArgs> | null
    /**
     * Filter, which Denda to fetch.
     */
    where?: DendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dendas to fetch.
     */
    orderBy?: DendaOrderByWithRelationInput | DendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dendas.
     */
    cursor?: DendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dendas.
     */
    distinct?: DendaScalarFieldEnum | DendaScalarFieldEnum[]
  }

  /**
   * Denda findMany
   */
  export type DendaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Denda
     */
    select?: DendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Denda
     */
    omit?: DendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DendaInclude<ExtArgs> | null
    /**
     * Filter, which Dendas to fetch.
     */
    where?: DendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dendas to fetch.
     */
    orderBy?: DendaOrderByWithRelationInput | DendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Dendas.
     */
    cursor?: DendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dendas.
     */
    distinct?: DendaScalarFieldEnum | DendaScalarFieldEnum[]
  }

  /**
   * Denda create
   */
  export type DendaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Denda
     */
    select?: DendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Denda
     */
    omit?: DendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DendaInclude<ExtArgs> | null
    /**
     * The data needed to create a Denda.
     */
    data: XOR<DendaCreateInput, DendaUncheckedCreateInput>
  }

  /**
   * Denda createMany
   */
  export type DendaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Dendas.
     */
    data: DendaCreateManyInput | DendaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Denda createManyAndReturn
   */
  export type DendaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Denda
     */
    select?: DendaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Denda
     */
    omit?: DendaOmit<ExtArgs> | null
    /**
     * The data used to create many Dendas.
     */
    data: DendaCreateManyInput | DendaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DendaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Denda update
   */
  export type DendaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Denda
     */
    select?: DendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Denda
     */
    omit?: DendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DendaInclude<ExtArgs> | null
    /**
     * The data needed to update a Denda.
     */
    data: XOR<DendaUpdateInput, DendaUncheckedUpdateInput>
    /**
     * Choose, which Denda to update.
     */
    where: DendaWhereUniqueInput
  }

  /**
   * Denda updateMany
   */
  export type DendaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Dendas.
     */
    data: XOR<DendaUpdateManyMutationInput, DendaUncheckedUpdateManyInput>
    /**
     * Filter which Dendas to update
     */
    where?: DendaWhereInput
    /**
     * Limit how many Dendas to update.
     */
    limit?: number
  }

  /**
   * Denda updateManyAndReturn
   */
  export type DendaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Denda
     */
    select?: DendaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Denda
     */
    omit?: DendaOmit<ExtArgs> | null
    /**
     * The data used to update Dendas.
     */
    data: XOR<DendaUpdateManyMutationInput, DendaUncheckedUpdateManyInput>
    /**
     * Filter which Dendas to update
     */
    where?: DendaWhereInput
    /**
     * Limit how many Dendas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DendaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Denda upsert
   */
  export type DendaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Denda
     */
    select?: DendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Denda
     */
    omit?: DendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DendaInclude<ExtArgs> | null
    /**
     * The filter to search for the Denda to update in case it exists.
     */
    where: DendaWhereUniqueInput
    /**
     * In case the Denda found by the `where` argument doesn't exist, create a new Denda with this data.
     */
    create: XOR<DendaCreateInput, DendaUncheckedCreateInput>
    /**
     * In case the Denda was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DendaUpdateInput, DendaUncheckedUpdateInput>
  }

  /**
   * Denda delete
   */
  export type DendaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Denda
     */
    select?: DendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Denda
     */
    omit?: DendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DendaInclude<ExtArgs> | null
    /**
     * Filter which Denda to delete.
     */
    where: DendaWhereUniqueInput
  }

  /**
   * Denda deleteMany
   */
  export type DendaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dendas to delete
     */
    where?: DendaWhereInput
    /**
     * Limit how many Dendas to delete.
     */
    limit?: number
  }

  /**
   * Denda without action
   */
  export type DendaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Denda
     */
    select?: DendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Denda
     */
    omit?: DendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DendaInclude<ExtArgs> | null
  }


  /**
   * Model Favorit
   */

  export type AggregateFavorit = {
    _count: FavoritCountAggregateOutputType | null
    _avg: FavoritAvgAggregateOutputType | null
    _sum: FavoritSumAggregateOutputType | null
    _min: FavoritMinAggregateOutputType | null
    _max: FavoritMaxAggregateOutputType | null
  }

  export type FavoritAvgAggregateOutputType = {
    id_favorit: number | null
    id_buku: number | null
  }

  export type FavoritSumAggregateOutputType = {
    id_favorit: number | null
    id_buku: number | null
  }

  export type FavoritMinAggregateOutputType = {
    id_favorit: number | null
    id_user: string | null
    id_buku: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FavoritMaxAggregateOutputType = {
    id_favorit: number | null
    id_user: string | null
    id_buku: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FavoritCountAggregateOutputType = {
    id_favorit: number
    id_user: number
    id_buku: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FavoritAvgAggregateInputType = {
    id_favorit?: true
    id_buku?: true
  }

  export type FavoritSumAggregateInputType = {
    id_favorit?: true
    id_buku?: true
  }

  export type FavoritMinAggregateInputType = {
    id_favorit?: true
    id_user?: true
    id_buku?: true
    created_at?: true
    updated_at?: true
  }

  export type FavoritMaxAggregateInputType = {
    id_favorit?: true
    id_user?: true
    id_buku?: true
    created_at?: true
    updated_at?: true
  }

  export type FavoritCountAggregateInputType = {
    id_favorit?: true
    id_user?: true
    id_buku?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FavoritAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorit to aggregate.
     */
    where?: FavoritWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorits to fetch.
     */
    orderBy?: FavoritOrderByWithRelationInput | FavoritOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavoritWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Favorits
    **/
    _count?: true | FavoritCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FavoritAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FavoritSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoritMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoritMaxAggregateInputType
  }

  export type GetFavoritAggregateType<T extends FavoritAggregateArgs> = {
        [P in keyof T & keyof AggregateFavorit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavorit[P]>
      : GetScalarType<T[P], AggregateFavorit[P]>
  }




  export type FavoritGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoritWhereInput
    orderBy?: FavoritOrderByWithAggregationInput | FavoritOrderByWithAggregationInput[]
    by: FavoritScalarFieldEnum[] | FavoritScalarFieldEnum
    having?: FavoritScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoritCountAggregateInputType | true
    _avg?: FavoritAvgAggregateInputType
    _sum?: FavoritSumAggregateInputType
    _min?: FavoritMinAggregateInputType
    _max?: FavoritMaxAggregateInputType
  }

  export type FavoritGroupByOutputType = {
    id_favorit: number
    id_user: string
    id_buku: number
    created_at: Date
    updated_at: Date
    _count: FavoritCountAggregateOutputType | null
    _avg: FavoritAvgAggregateOutputType | null
    _sum: FavoritSumAggregateOutputType | null
    _min: FavoritMinAggregateOutputType | null
    _max: FavoritMaxAggregateOutputType | null
  }

  type GetFavoritGroupByPayload<T extends FavoritGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavoritGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoritGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoritGroupByOutputType[P]>
            : GetScalarType<T[P], FavoritGroupByOutputType[P]>
        }
      >
    >


  export type FavoritSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_favorit?: boolean
    id_user?: boolean
    id_buku?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorit"]>

  export type FavoritSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_favorit?: boolean
    id_user?: boolean
    id_buku?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorit"]>

  export type FavoritSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_favorit?: boolean
    id_user?: boolean
    id_buku?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorit"]>

  export type FavoritSelectScalar = {
    id_favorit?: boolean
    id_user?: boolean
    id_buku?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type FavoritOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_favorit" | "id_user" | "id_buku" | "created_at" | "updated_at", ExtArgs["result"]["favorit"]>
  export type FavoritInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }
  export type FavoritIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }
  export type FavoritIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    buku?: boolean | BukuDefaultArgs<ExtArgs>
  }

  export type $FavoritPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Favorit"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      buku: Prisma.$BukuPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_favorit: number
      id_user: string
      id_buku: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["favorit"]>
    composites: {}
  }

  type FavoritGetPayload<S extends boolean | null | undefined | FavoritDefaultArgs> = $Result.GetResult<Prisma.$FavoritPayload, S>

  type FavoritCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FavoritFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FavoritCountAggregateInputType | true
    }

  export interface FavoritDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Favorit'], meta: { name: 'Favorit' } }
    /**
     * Find zero or one Favorit that matches the filter.
     * @param {FavoritFindUniqueArgs} args - Arguments to find a Favorit
     * @example
     * // Get one Favorit
     * const favorit = await prisma.favorit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FavoritFindUniqueArgs>(args: SelectSubset<T, FavoritFindUniqueArgs<ExtArgs>>): Prisma__FavoritClient<$Result.GetResult<Prisma.$FavoritPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Favorit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FavoritFindUniqueOrThrowArgs} args - Arguments to find a Favorit
     * @example
     * // Get one Favorit
     * const favorit = await prisma.favorit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FavoritFindUniqueOrThrowArgs>(args: SelectSubset<T, FavoritFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FavoritClient<$Result.GetResult<Prisma.$FavoritPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritFindFirstArgs} args - Arguments to find a Favorit
     * @example
     * // Get one Favorit
     * const favorit = await prisma.favorit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FavoritFindFirstArgs>(args?: SelectSubset<T, FavoritFindFirstArgs<ExtArgs>>): Prisma__FavoritClient<$Result.GetResult<Prisma.$FavoritPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritFindFirstOrThrowArgs} args - Arguments to find a Favorit
     * @example
     * // Get one Favorit
     * const favorit = await prisma.favorit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FavoritFindFirstOrThrowArgs>(args?: SelectSubset<T, FavoritFindFirstOrThrowArgs<ExtArgs>>): Prisma__FavoritClient<$Result.GetResult<Prisma.$FavoritPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Favorits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Favorits
     * const favorits = await prisma.favorit.findMany()
     * 
     * // Get first 10 Favorits
     * const favorits = await prisma.favorit.findMany({ take: 10 })
     * 
     * // Only select the `id_favorit`
     * const favoritWithId_favoritOnly = await prisma.favorit.findMany({ select: { id_favorit: true } })
     * 
     */
    findMany<T extends FavoritFindManyArgs>(args?: SelectSubset<T, FavoritFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Favorit.
     * @param {FavoritCreateArgs} args - Arguments to create a Favorit.
     * @example
     * // Create one Favorit
     * const Favorit = await prisma.favorit.create({
     *   data: {
     *     // ... data to create a Favorit
     *   }
     * })
     * 
     */
    create<T extends FavoritCreateArgs>(args: SelectSubset<T, FavoritCreateArgs<ExtArgs>>): Prisma__FavoritClient<$Result.GetResult<Prisma.$FavoritPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Favorits.
     * @param {FavoritCreateManyArgs} args - Arguments to create many Favorits.
     * @example
     * // Create many Favorits
     * const favorit = await prisma.favorit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FavoritCreateManyArgs>(args?: SelectSubset<T, FavoritCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Favorits and returns the data saved in the database.
     * @param {FavoritCreateManyAndReturnArgs} args - Arguments to create many Favorits.
     * @example
     * // Create many Favorits
     * const favorit = await prisma.favorit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Favorits and only return the `id_favorit`
     * const favoritWithId_favoritOnly = await prisma.favorit.createManyAndReturn({
     *   select: { id_favorit: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FavoritCreateManyAndReturnArgs>(args?: SelectSubset<T, FavoritCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Favorit.
     * @param {FavoritDeleteArgs} args - Arguments to delete one Favorit.
     * @example
     * // Delete one Favorit
     * const Favorit = await prisma.favorit.delete({
     *   where: {
     *     // ... filter to delete one Favorit
     *   }
     * })
     * 
     */
    delete<T extends FavoritDeleteArgs>(args: SelectSubset<T, FavoritDeleteArgs<ExtArgs>>): Prisma__FavoritClient<$Result.GetResult<Prisma.$FavoritPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Favorit.
     * @param {FavoritUpdateArgs} args - Arguments to update one Favorit.
     * @example
     * // Update one Favorit
     * const favorit = await prisma.favorit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FavoritUpdateArgs>(args: SelectSubset<T, FavoritUpdateArgs<ExtArgs>>): Prisma__FavoritClient<$Result.GetResult<Prisma.$FavoritPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Favorits.
     * @param {FavoritDeleteManyArgs} args - Arguments to filter Favorits to delete.
     * @example
     * // Delete a few Favorits
     * const { count } = await prisma.favorit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FavoritDeleteManyArgs>(args?: SelectSubset<T, FavoritDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Favorits
     * const favorit = await prisma.favorit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FavoritUpdateManyArgs>(args: SelectSubset<T, FavoritUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorits and returns the data updated in the database.
     * @param {FavoritUpdateManyAndReturnArgs} args - Arguments to update many Favorits.
     * @example
     * // Update many Favorits
     * const favorit = await prisma.favorit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Favorits and only return the `id_favorit`
     * const favoritWithId_favoritOnly = await prisma.favorit.updateManyAndReturn({
     *   select: { id_favorit: true },
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
    updateManyAndReturn<T extends FavoritUpdateManyAndReturnArgs>(args: SelectSubset<T, FavoritUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Favorit.
     * @param {FavoritUpsertArgs} args - Arguments to update or create a Favorit.
     * @example
     * // Update or create a Favorit
     * const favorit = await prisma.favorit.upsert({
     *   create: {
     *     // ... data to create a Favorit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Favorit we want to update
     *   }
     * })
     */
    upsert<T extends FavoritUpsertArgs>(args: SelectSubset<T, FavoritUpsertArgs<ExtArgs>>): Prisma__FavoritClient<$Result.GetResult<Prisma.$FavoritPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Favorits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritCountArgs} args - Arguments to filter Favorits to count.
     * @example
     * // Count the number of Favorits
     * const count = await prisma.favorit.count({
     *   where: {
     *     // ... the filter for the Favorits we want to count
     *   }
     * })
    **/
    count<T extends FavoritCountArgs>(
      args?: Subset<T, FavoritCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoritCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Favorit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FavoritAggregateArgs>(args: Subset<T, FavoritAggregateArgs>): Prisma.PrismaPromise<GetFavoritAggregateType<T>>

    /**
     * Group by Favorit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritGroupByArgs} args - Group by arguments.
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
      T extends FavoritGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavoritGroupByArgs['orderBy'] }
        : { orderBy?: FavoritGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FavoritGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoritGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Favorit model
   */
  readonly fields: FavoritFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Favorit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FavoritClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    buku<T extends BukuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BukuDefaultArgs<ExtArgs>>): Prisma__BukuClient<$Result.GetResult<Prisma.$BukuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Favorit model
   */
  interface FavoritFieldRefs {
    readonly id_favorit: FieldRef<"Favorit", 'Int'>
    readonly id_user: FieldRef<"Favorit", 'String'>
    readonly id_buku: FieldRef<"Favorit", 'Int'>
    readonly created_at: FieldRef<"Favorit", 'DateTime'>
    readonly updated_at: FieldRef<"Favorit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Favorit findUnique
   */
  export type FavoritFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritInclude<ExtArgs> | null
    /**
     * Filter, which Favorit to fetch.
     */
    where: FavoritWhereUniqueInput
  }

  /**
   * Favorit findUniqueOrThrow
   */
  export type FavoritFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritInclude<ExtArgs> | null
    /**
     * Filter, which Favorit to fetch.
     */
    where: FavoritWhereUniqueInput
  }

  /**
   * Favorit findFirst
   */
  export type FavoritFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritInclude<ExtArgs> | null
    /**
     * Filter, which Favorit to fetch.
     */
    where?: FavoritWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorits to fetch.
     */
    orderBy?: FavoritOrderByWithRelationInput | FavoritOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorits.
     */
    cursor?: FavoritWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorits.
     */
    distinct?: FavoritScalarFieldEnum | FavoritScalarFieldEnum[]
  }

  /**
   * Favorit findFirstOrThrow
   */
  export type FavoritFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritInclude<ExtArgs> | null
    /**
     * Filter, which Favorit to fetch.
     */
    where?: FavoritWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorits to fetch.
     */
    orderBy?: FavoritOrderByWithRelationInput | FavoritOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorits.
     */
    cursor?: FavoritWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorits.
     */
    distinct?: FavoritScalarFieldEnum | FavoritScalarFieldEnum[]
  }

  /**
   * Favorit findMany
   */
  export type FavoritFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritInclude<ExtArgs> | null
    /**
     * Filter, which Favorits to fetch.
     */
    where?: FavoritWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorits to fetch.
     */
    orderBy?: FavoritOrderByWithRelationInput | FavoritOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Favorits.
     */
    cursor?: FavoritWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorits.
     */
    distinct?: FavoritScalarFieldEnum | FavoritScalarFieldEnum[]
  }

  /**
   * Favorit create
   */
  export type FavoritCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritInclude<ExtArgs> | null
    /**
     * The data needed to create a Favorit.
     */
    data: XOR<FavoritCreateInput, FavoritUncheckedCreateInput>
  }

  /**
   * Favorit createMany
   */
  export type FavoritCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Favorits.
     */
    data: FavoritCreateManyInput | FavoritCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Favorit createManyAndReturn
   */
  export type FavoritCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * The data used to create many Favorits.
     */
    data: FavoritCreateManyInput | FavoritCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favorit update
   */
  export type FavoritUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritInclude<ExtArgs> | null
    /**
     * The data needed to update a Favorit.
     */
    data: XOR<FavoritUpdateInput, FavoritUncheckedUpdateInput>
    /**
     * Choose, which Favorit to update.
     */
    where: FavoritWhereUniqueInput
  }

  /**
   * Favorit updateMany
   */
  export type FavoritUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Favorits.
     */
    data: XOR<FavoritUpdateManyMutationInput, FavoritUncheckedUpdateManyInput>
    /**
     * Filter which Favorits to update
     */
    where?: FavoritWhereInput
    /**
     * Limit how many Favorits to update.
     */
    limit?: number
  }

  /**
   * Favorit updateManyAndReturn
   */
  export type FavoritUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * The data used to update Favorits.
     */
    data: XOR<FavoritUpdateManyMutationInput, FavoritUncheckedUpdateManyInput>
    /**
     * Filter which Favorits to update
     */
    where?: FavoritWhereInput
    /**
     * Limit how many Favorits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favorit upsert
   */
  export type FavoritUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritInclude<ExtArgs> | null
    /**
     * The filter to search for the Favorit to update in case it exists.
     */
    where: FavoritWhereUniqueInput
    /**
     * In case the Favorit found by the `where` argument doesn't exist, create a new Favorit with this data.
     */
    create: XOR<FavoritCreateInput, FavoritUncheckedCreateInput>
    /**
     * In case the Favorit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavoritUpdateInput, FavoritUncheckedUpdateInput>
  }

  /**
   * Favorit delete
   */
  export type FavoritDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritInclude<ExtArgs> | null
    /**
     * Filter which Favorit to delete.
     */
    where: FavoritWhereUniqueInput
  }

  /**
   * Favorit deleteMany
   */
  export type FavoritDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorits to delete
     */
    where?: FavoritWhereInput
    /**
     * Limit how many Favorits to delete.
     */
    limit?: number
  }

  /**
   * Favorit without action
   */
  export type FavoritDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorit
     */
    select?: FavoritSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorit
     */
    omit?: FavoritOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id_user: 'id_user',
    nama: 'nama',
    npm: 'npm',
    no_telp: 'no_telp',
    email: 'email',
    password: 'password',
    alamat: 'alamat',
    jenis_kelamin: 'jenis_kelamin',
    role: 'role',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const KategoriScalarFieldEnum: {
    id_kategori: 'id_kategori',
    nama_kategori: 'nama_kategori',
    deskripsi: 'deskripsi',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type KategoriScalarFieldEnum = (typeof KategoriScalarFieldEnum)[keyof typeof KategoriScalarFieldEnum]


  export const BukuScalarFieldEnum: {
    id_buku: 'id_buku',
    id_kategori: 'id_kategori',
    judul: 'judul',
    penulis: 'penulis',
    penerbit: 'penerbit',
    tahun_terbit: 'tahun_terbit',
    isbn: 'isbn',
    stok: 'stok',
    cover_buku: 'cover_buku',
    sinopsis: 'sinopsis',
    rating_rata: 'rating_rata',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type BukuScalarFieldEnum = (typeof BukuScalarFieldEnum)[keyof typeof BukuScalarFieldEnum]


  export const PeminjamanScalarFieldEnum: {
    id_peminjaman: 'id_peminjaman',
    id_user: 'id_user',
    id_buku: 'id_buku',
    kode_peminjaman: 'kode_peminjaman',
    tanggal_pinjam: 'tanggal_pinjam',
    tanggal_kembali: 'tanggal_kembali',
    tanggal_dikembalikan: 'tanggal_dikembalikan',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PeminjamanScalarFieldEnum = (typeof PeminjamanScalarFieldEnum)[keyof typeof PeminjamanScalarFieldEnum]


  export const RatingScalarFieldEnum: {
    id_rating: 'id_rating',
    id_user: 'id_user',
    id_buku: 'id_buku',
    rating: 'rating',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type RatingScalarFieldEnum = (typeof RatingScalarFieldEnum)[keyof typeof RatingScalarFieldEnum]


  export const DendaScalarFieldEnum: {
    id_denda: 'id_denda',
    id_peminjaman: 'id_peminjaman',
    jumlah_denda: 'jumlah_denda',
    hari_terlambat: 'hari_terlambat',
    keterangan_denda: 'keterangan_denda',
    status_bayar: 'status_bayar',
    tanggal_bayar: 'tanggal_bayar',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type DendaScalarFieldEnum = (typeof DendaScalarFieldEnum)[keyof typeof DendaScalarFieldEnum]


  export const FavoritScalarFieldEnum: {
    id_favorit: 'id_favorit',
    id_user: 'id_user',
    id_buku: 'id_buku',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type FavoritScalarFieldEnum = (typeof FavoritScalarFieldEnum)[keyof typeof FavoritScalarFieldEnum]


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
   * Reference to a field of type 'JK'
   */
  export type EnumJKFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JK'>
    


  /**
   * Reference to a field of type 'JK[]'
   */
  export type ListEnumJKFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JK[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'StatusPeminjaman'
   */
  export type EnumStatusPeminjamanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusPeminjaman'>
    


  /**
   * Reference to a field of type 'StatusPeminjaman[]'
   */
  export type ListEnumStatusPeminjamanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusPeminjaman[]'>
    


  /**
   * Reference to a field of type 'keteranganDenda'
   */
  export type EnumketeranganDendaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'keteranganDenda'>
    


  /**
   * Reference to a field of type 'keteranganDenda[]'
   */
  export type ListEnumketeranganDendaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'keteranganDenda[]'>
    


  /**
   * Reference to a field of type 'StatusBayar'
   */
  export type EnumStatusBayarFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusBayar'>
    


  /**
   * Reference to a field of type 'StatusBayar[]'
   */
  export type ListEnumStatusBayarFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusBayar[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id_user?: StringFilter<"User"> | string
    nama?: StringNullableFilter<"User"> | string | null
    npm?: StringFilter<"User"> | string
    no_telp?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    alamat?: StringNullableFilter<"User"> | string | null
    jenis_kelamin?: EnumJKNullableFilter<"User"> | $Enums.JK | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    peminjaman?: PeminjamanListRelationFilter
    ratings?: RatingListRelationFilter
    favorit?: FavoritListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id_user?: SortOrder
    nama?: SortOrderInput | SortOrder
    npm?: SortOrder
    no_telp?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    alamat?: SortOrderInput | SortOrder
    jenis_kelamin?: SortOrderInput | SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    peminjaman?: PeminjamanOrderByRelationAggregateInput
    ratings?: RatingOrderByRelationAggregateInput
    favorit?: FavoritOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id_user?: string
    npm?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nama?: StringNullableFilter<"User"> | string | null
    no_telp?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    alamat?: StringNullableFilter<"User"> | string | null
    jenis_kelamin?: EnumJKNullableFilter<"User"> | $Enums.JK | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    peminjaman?: PeminjamanListRelationFilter
    ratings?: RatingListRelationFilter
    favorit?: FavoritListRelationFilter
  }, "id_user" | "npm" | "email">

  export type UserOrderByWithAggregationInput = {
    id_user?: SortOrder
    nama?: SortOrderInput | SortOrder
    npm?: SortOrder
    no_telp?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    alamat?: SortOrderInput | SortOrder
    jenis_kelamin?: SortOrderInput | SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id_user?: StringWithAggregatesFilter<"User"> | string
    nama?: StringNullableWithAggregatesFilter<"User"> | string | null
    npm?: StringWithAggregatesFilter<"User"> | string
    no_telp?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    alamat?: StringNullableWithAggregatesFilter<"User"> | string | null
    jenis_kelamin?: EnumJKNullableWithAggregatesFilter<"User"> | $Enums.JK | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type KategoriWhereInput = {
    AND?: KategoriWhereInput | KategoriWhereInput[]
    OR?: KategoriWhereInput[]
    NOT?: KategoriWhereInput | KategoriWhereInput[]
    id_kategori?: IntFilter<"Kategori"> | number
    nama_kategori?: StringFilter<"Kategori"> | string
    deskripsi?: StringFilter<"Kategori"> | string
    created_at?: DateTimeFilter<"Kategori"> | Date | string
    updated_at?: DateTimeFilter<"Kategori"> | Date | string
    buku?: BukuListRelationFilter
  }

  export type KategoriOrderByWithRelationInput = {
    id_kategori?: SortOrder
    nama_kategori?: SortOrder
    deskripsi?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    buku?: BukuOrderByRelationAggregateInput
  }

  export type KategoriWhereUniqueInput = Prisma.AtLeast<{
    id_kategori?: number
    AND?: KategoriWhereInput | KategoriWhereInput[]
    OR?: KategoriWhereInput[]
    NOT?: KategoriWhereInput | KategoriWhereInput[]
    nama_kategori?: StringFilter<"Kategori"> | string
    deskripsi?: StringFilter<"Kategori"> | string
    created_at?: DateTimeFilter<"Kategori"> | Date | string
    updated_at?: DateTimeFilter<"Kategori"> | Date | string
    buku?: BukuListRelationFilter
  }, "id_kategori">

  export type KategoriOrderByWithAggregationInput = {
    id_kategori?: SortOrder
    nama_kategori?: SortOrder
    deskripsi?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: KategoriCountOrderByAggregateInput
    _avg?: KategoriAvgOrderByAggregateInput
    _max?: KategoriMaxOrderByAggregateInput
    _min?: KategoriMinOrderByAggregateInput
    _sum?: KategoriSumOrderByAggregateInput
  }

  export type KategoriScalarWhereWithAggregatesInput = {
    AND?: KategoriScalarWhereWithAggregatesInput | KategoriScalarWhereWithAggregatesInput[]
    OR?: KategoriScalarWhereWithAggregatesInput[]
    NOT?: KategoriScalarWhereWithAggregatesInput | KategoriScalarWhereWithAggregatesInput[]
    id_kategori?: IntWithAggregatesFilter<"Kategori"> | number
    nama_kategori?: StringWithAggregatesFilter<"Kategori"> | string
    deskripsi?: StringWithAggregatesFilter<"Kategori"> | string
    created_at?: DateTimeWithAggregatesFilter<"Kategori"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Kategori"> | Date | string
  }

  export type BukuWhereInput = {
    AND?: BukuWhereInput | BukuWhereInput[]
    OR?: BukuWhereInput[]
    NOT?: BukuWhereInput | BukuWhereInput[]
    id_buku?: IntFilter<"Buku"> | number
    id_kategori?: IntFilter<"Buku"> | number
    judul?: StringFilter<"Buku"> | string
    penulis?: StringFilter<"Buku"> | string
    penerbit?: StringFilter<"Buku"> | string
    tahun_terbit?: IntFilter<"Buku"> | number
    isbn?: StringFilter<"Buku"> | string
    stok?: IntFilter<"Buku"> | number
    cover_buku?: StringFilter<"Buku"> | string
    sinopsis?: StringFilter<"Buku"> | string
    rating_rata?: DecimalFilter<"Buku"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"Buku"> | Date | string
    updated_at?: DateTimeFilter<"Buku"> | Date | string
    kategori?: XOR<KategoriScalarRelationFilter, KategoriWhereInput>
    peminjaman?: PeminjamanListRelationFilter
    ratings?: RatingListRelationFilter
    favorit?: FavoritListRelationFilter
  }

  export type BukuOrderByWithRelationInput = {
    id_buku?: SortOrder
    id_kategori?: SortOrder
    judul?: SortOrder
    penulis?: SortOrder
    penerbit?: SortOrder
    tahun_terbit?: SortOrder
    isbn?: SortOrder
    stok?: SortOrder
    cover_buku?: SortOrder
    sinopsis?: SortOrder
    rating_rata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    kategori?: KategoriOrderByWithRelationInput
    peminjaman?: PeminjamanOrderByRelationAggregateInput
    ratings?: RatingOrderByRelationAggregateInput
    favorit?: FavoritOrderByRelationAggregateInput
  }

  export type BukuWhereUniqueInput = Prisma.AtLeast<{
    id_buku?: number
    isbn?: string
    AND?: BukuWhereInput | BukuWhereInput[]
    OR?: BukuWhereInput[]
    NOT?: BukuWhereInput | BukuWhereInput[]
    id_kategori?: IntFilter<"Buku"> | number
    judul?: StringFilter<"Buku"> | string
    penulis?: StringFilter<"Buku"> | string
    penerbit?: StringFilter<"Buku"> | string
    tahun_terbit?: IntFilter<"Buku"> | number
    stok?: IntFilter<"Buku"> | number
    cover_buku?: StringFilter<"Buku"> | string
    sinopsis?: StringFilter<"Buku"> | string
    rating_rata?: DecimalFilter<"Buku"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"Buku"> | Date | string
    updated_at?: DateTimeFilter<"Buku"> | Date | string
    kategori?: XOR<KategoriScalarRelationFilter, KategoriWhereInput>
    peminjaman?: PeminjamanListRelationFilter
    ratings?: RatingListRelationFilter
    favorit?: FavoritListRelationFilter
  }, "id_buku" | "isbn">

  export type BukuOrderByWithAggregationInput = {
    id_buku?: SortOrder
    id_kategori?: SortOrder
    judul?: SortOrder
    penulis?: SortOrder
    penerbit?: SortOrder
    tahun_terbit?: SortOrder
    isbn?: SortOrder
    stok?: SortOrder
    cover_buku?: SortOrder
    sinopsis?: SortOrder
    rating_rata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: BukuCountOrderByAggregateInput
    _avg?: BukuAvgOrderByAggregateInput
    _max?: BukuMaxOrderByAggregateInput
    _min?: BukuMinOrderByAggregateInput
    _sum?: BukuSumOrderByAggregateInput
  }

  export type BukuScalarWhereWithAggregatesInput = {
    AND?: BukuScalarWhereWithAggregatesInput | BukuScalarWhereWithAggregatesInput[]
    OR?: BukuScalarWhereWithAggregatesInput[]
    NOT?: BukuScalarWhereWithAggregatesInput | BukuScalarWhereWithAggregatesInput[]
    id_buku?: IntWithAggregatesFilter<"Buku"> | number
    id_kategori?: IntWithAggregatesFilter<"Buku"> | number
    judul?: StringWithAggregatesFilter<"Buku"> | string
    penulis?: StringWithAggregatesFilter<"Buku"> | string
    penerbit?: StringWithAggregatesFilter<"Buku"> | string
    tahun_terbit?: IntWithAggregatesFilter<"Buku"> | number
    isbn?: StringWithAggregatesFilter<"Buku"> | string
    stok?: IntWithAggregatesFilter<"Buku"> | number
    cover_buku?: StringWithAggregatesFilter<"Buku"> | string
    sinopsis?: StringWithAggregatesFilter<"Buku"> | string
    rating_rata?: DecimalWithAggregatesFilter<"Buku"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeWithAggregatesFilter<"Buku"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Buku"> | Date | string
  }

  export type PeminjamanWhereInput = {
    AND?: PeminjamanWhereInput | PeminjamanWhereInput[]
    OR?: PeminjamanWhereInput[]
    NOT?: PeminjamanWhereInput | PeminjamanWhereInput[]
    id_peminjaman?: IntFilter<"Peminjaman"> | number
    id_user?: StringFilter<"Peminjaman"> | string
    id_buku?: IntFilter<"Peminjaman"> | number
    kode_peminjaman?: StringFilter<"Peminjaman"> | string
    tanggal_pinjam?: DateTimeFilter<"Peminjaman"> | Date | string
    tanggal_kembali?: DateTimeFilter<"Peminjaman"> | Date | string
    tanggal_dikembalikan?: DateTimeNullableFilter<"Peminjaman"> | Date | string | null
    status?: EnumStatusPeminjamanFilter<"Peminjaman"> | $Enums.StatusPeminjaman
    created_at?: DateTimeFilter<"Peminjaman"> | Date | string
    updated_at?: DateTimeFilter<"Peminjaman"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    buku?: XOR<BukuScalarRelationFilter, BukuWhereInput>
    denda?: XOR<DendaNullableScalarRelationFilter, DendaWhereInput> | null
  }

  export type PeminjamanOrderByWithRelationInput = {
    id_peminjaman?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    kode_peminjaman?: SortOrder
    tanggal_pinjam?: SortOrder
    tanggal_kembali?: SortOrder
    tanggal_dikembalikan?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    buku?: BukuOrderByWithRelationInput
    denda?: DendaOrderByWithRelationInput
  }

  export type PeminjamanWhereUniqueInput = Prisma.AtLeast<{
    id_peminjaman?: number
    kode_peminjaman?: string
    AND?: PeminjamanWhereInput | PeminjamanWhereInput[]
    OR?: PeminjamanWhereInput[]
    NOT?: PeminjamanWhereInput | PeminjamanWhereInput[]
    id_user?: StringFilter<"Peminjaman"> | string
    id_buku?: IntFilter<"Peminjaman"> | number
    tanggal_pinjam?: DateTimeFilter<"Peminjaman"> | Date | string
    tanggal_kembali?: DateTimeFilter<"Peminjaman"> | Date | string
    tanggal_dikembalikan?: DateTimeNullableFilter<"Peminjaman"> | Date | string | null
    status?: EnumStatusPeminjamanFilter<"Peminjaman"> | $Enums.StatusPeminjaman
    created_at?: DateTimeFilter<"Peminjaman"> | Date | string
    updated_at?: DateTimeFilter<"Peminjaman"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    buku?: XOR<BukuScalarRelationFilter, BukuWhereInput>
    denda?: XOR<DendaNullableScalarRelationFilter, DendaWhereInput> | null
  }, "id_peminjaman" | "kode_peminjaman">

  export type PeminjamanOrderByWithAggregationInput = {
    id_peminjaman?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    kode_peminjaman?: SortOrder
    tanggal_pinjam?: SortOrder
    tanggal_kembali?: SortOrder
    tanggal_dikembalikan?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PeminjamanCountOrderByAggregateInput
    _avg?: PeminjamanAvgOrderByAggregateInput
    _max?: PeminjamanMaxOrderByAggregateInput
    _min?: PeminjamanMinOrderByAggregateInput
    _sum?: PeminjamanSumOrderByAggregateInput
  }

  export type PeminjamanScalarWhereWithAggregatesInput = {
    AND?: PeminjamanScalarWhereWithAggregatesInput | PeminjamanScalarWhereWithAggregatesInput[]
    OR?: PeminjamanScalarWhereWithAggregatesInput[]
    NOT?: PeminjamanScalarWhereWithAggregatesInput | PeminjamanScalarWhereWithAggregatesInput[]
    id_peminjaman?: IntWithAggregatesFilter<"Peminjaman"> | number
    id_user?: StringWithAggregatesFilter<"Peminjaman"> | string
    id_buku?: IntWithAggregatesFilter<"Peminjaman"> | number
    kode_peminjaman?: StringWithAggregatesFilter<"Peminjaman"> | string
    tanggal_pinjam?: DateTimeWithAggregatesFilter<"Peminjaman"> | Date | string
    tanggal_kembali?: DateTimeWithAggregatesFilter<"Peminjaman"> | Date | string
    tanggal_dikembalikan?: DateTimeNullableWithAggregatesFilter<"Peminjaman"> | Date | string | null
    status?: EnumStatusPeminjamanWithAggregatesFilter<"Peminjaman"> | $Enums.StatusPeminjaman
    created_at?: DateTimeWithAggregatesFilter<"Peminjaman"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Peminjaman"> | Date | string
  }

  export type RatingWhereInput = {
    AND?: RatingWhereInput | RatingWhereInput[]
    OR?: RatingWhereInput[]
    NOT?: RatingWhereInput | RatingWhereInput[]
    id_rating?: IntFilter<"Rating"> | number
    id_user?: StringFilter<"Rating"> | string
    id_buku?: IntFilter<"Rating"> | number
    rating?: IntFilter<"Rating"> | number
    created_at?: DateTimeFilter<"Rating"> | Date | string
    updated_at?: DateTimeFilter<"Rating"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    buku?: XOR<BukuScalarRelationFilter, BukuWhereInput>
  }

  export type RatingOrderByWithRelationInput = {
    id_rating?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    rating?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    buku?: BukuOrderByWithRelationInput
  }

  export type RatingWhereUniqueInput = Prisma.AtLeast<{
    id_rating?: number
    AND?: RatingWhereInput | RatingWhereInput[]
    OR?: RatingWhereInput[]
    NOT?: RatingWhereInput | RatingWhereInput[]
    id_user?: StringFilter<"Rating"> | string
    id_buku?: IntFilter<"Rating"> | number
    rating?: IntFilter<"Rating"> | number
    created_at?: DateTimeFilter<"Rating"> | Date | string
    updated_at?: DateTimeFilter<"Rating"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    buku?: XOR<BukuScalarRelationFilter, BukuWhereInput>
  }, "id_rating">

  export type RatingOrderByWithAggregationInput = {
    id_rating?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    rating?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: RatingCountOrderByAggregateInput
    _avg?: RatingAvgOrderByAggregateInput
    _max?: RatingMaxOrderByAggregateInput
    _min?: RatingMinOrderByAggregateInput
    _sum?: RatingSumOrderByAggregateInput
  }

  export type RatingScalarWhereWithAggregatesInput = {
    AND?: RatingScalarWhereWithAggregatesInput | RatingScalarWhereWithAggregatesInput[]
    OR?: RatingScalarWhereWithAggregatesInput[]
    NOT?: RatingScalarWhereWithAggregatesInput | RatingScalarWhereWithAggregatesInput[]
    id_rating?: IntWithAggregatesFilter<"Rating"> | number
    id_user?: StringWithAggregatesFilter<"Rating"> | string
    id_buku?: IntWithAggregatesFilter<"Rating"> | number
    rating?: IntWithAggregatesFilter<"Rating"> | number
    created_at?: DateTimeWithAggregatesFilter<"Rating"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Rating"> | Date | string
  }

  export type DendaWhereInput = {
    AND?: DendaWhereInput | DendaWhereInput[]
    OR?: DendaWhereInput[]
    NOT?: DendaWhereInput | DendaWhereInput[]
    id_denda?: IntFilter<"Denda"> | number
    id_peminjaman?: IntFilter<"Denda"> | number
    jumlah_denda?: DecimalFilter<"Denda"> | Decimal | DecimalJsLike | number | string
    hari_terlambat?: IntFilter<"Denda"> | number
    keterangan_denda?: EnumketeranganDendaFilter<"Denda"> | $Enums.keteranganDenda
    status_bayar?: EnumStatusBayarFilter<"Denda"> | $Enums.StatusBayar
    tanggal_bayar?: DateTimeNullableFilter<"Denda"> | Date | string | null
    created_at?: DateTimeFilter<"Denda"> | Date | string
    updated_at?: DateTimeFilter<"Denda"> | Date | string
    peminjaman?: XOR<PeminjamanScalarRelationFilter, PeminjamanWhereInput>
  }

  export type DendaOrderByWithRelationInput = {
    id_denda?: SortOrder
    id_peminjaman?: SortOrder
    jumlah_denda?: SortOrder
    hari_terlambat?: SortOrder
    keterangan_denda?: SortOrder
    status_bayar?: SortOrder
    tanggal_bayar?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    peminjaman?: PeminjamanOrderByWithRelationInput
  }

  export type DendaWhereUniqueInput = Prisma.AtLeast<{
    id_denda?: number
    id_peminjaman?: number
    AND?: DendaWhereInput | DendaWhereInput[]
    OR?: DendaWhereInput[]
    NOT?: DendaWhereInput | DendaWhereInput[]
    jumlah_denda?: DecimalFilter<"Denda"> | Decimal | DecimalJsLike | number | string
    hari_terlambat?: IntFilter<"Denda"> | number
    keterangan_denda?: EnumketeranganDendaFilter<"Denda"> | $Enums.keteranganDenda
    status_bayar?: EnumStatusBayarFilter<"Denda"> | $Enums.StatusBayar
    tanggal_bayar?: DateTimeNullableFilter<"Denda"> | Date | string | null
    created_at?: DateTimeFilter<"Denda"> | Date | string
    updated_at?: DateTimeFilter<"Denda"> | Date | string
    peminjaman?: XOR<PeminjamanScalarRelationFilter, PeminjamanWhereInput>
  }, "id_denda" | "id_peminjaman">

  export type DendaOrderByWithAggregationInput = {
    id_denda?: SortOrder
    id_peminjaman?: SortOrder
    jumlah_denda?: SortOrder
    hari_terlambat?: SortOrder
    keterangan_denda?: SortOrder
    status_bayar?: SortOrder
    tanggal_bayar?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: DendaCountOrderByAggregateInput
    _avg?: DendaAvgOrderByAggregateInput
    _max?: DendaMaxOrderByAggregateInput
    _min?: DendaMinOrderByAggregateInput
    _sum?: DendaSumOrderByAggregateInput
  }

  export type DendaScalarWhereWithAggregatesInput = {
    AND?: DendaScalarWhereWithAggregatesInput | DendaScalarWhereWithAggregatesInput[]
    OR?: DendaScalarWhereWithAggregatesInput[]
    NOT?: DendaScalarWhereWithAggregatesInput | DendaScalarWhereWithAggregatesInput[]
    id_denda?: IntWithAggregatesFilter<"Denda"> | number
    id_peminjaman?: IntWithAggregatesFilter<"Denda"> | number
    jumlah_denda?: DecimalWithAggregatesFilter<"Denda"> | Decimal | DecimalJsLike | number | string
    hari_terlambat?: IntWithAggregatesFilter<"Denda"> | number
    keterangan_denda?: EnumketeranganDendaWithAggregatesFilter<"Denda"> | $Enums.keteranganDenda
    status_bayar?: EnumStatusBayarWithAggregatesFilter<"Denda"> | $Enums.StatusBayar
    tanggal_bayar?: DateTimeNullableWithAggregatesFilter<"Denda"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Denda"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Denda"> | Date | string
  }

  export type FavoritWhereInput = {
    AND?: FavoritWhereInput | FavoritWhereInput[]
    OR?: FavoritWhereInput[]
    NOT?: FavoritWhereInput | FavoritWhereInput[]
    id_favorit?: IntFilter<"Favorit"> | number
    id_user?: StringFilter<"Favorit"> | string
    id_buku?: IntFilter<"Favorit"> | number
    created_at?: DateTimeFilter<"Favorit"> | Date | string
    updated_at?: DateTimeFilter<"Favorit"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    buku?: XOR<BukuScalarRelationFilter, BukuWhereInput>
  }

  export type FavoritOrderByWithRelationInput = {
    id_favorit?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    buku?: BukuOrderByWithRelationInput
  }

  export type FavoritWhereUniqueInput = Prisma.AtLeast<{
    id_favorit?: number
    AND?: FavoritWhereInput | FavoritWhereInput[]
    OR?: FavoritWhereInput[]
    NOT?: FavoritWhereInput | FavoritWhereInput[]
    id_user?: StringFilter<"Favorit"> | string
    id_buku?: IntFilter<"Favorit"> | number
    created_at?: DateTimeFilter<"Favorit"> | Date | string
    updated_at?: DateTimeFilter<"Favorit"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    buku?: XOR<BukuScalarRelationFilter, BukuWhereInput>
  }, "id_favorit">

  export type FavoritOrderByWithAggregationInput = {
    id_favorit?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: FavoritCountOrderByAggregateInput
    _avg?: FavoritAvgOrderByAggregateInput
    _max?: FavoritMaxOrderByAggregateInput
    _min?: FavoritMinOrderByAggregateInput
    _sum?: FavoritSumOrderByAggregateInput
  }

  export type FavoritScalarWhereWithAggregatesInput = {
    AND?: FavoritScalarWhereWithAggregatesInput | FavoritScalarWhereWithAggregatesInput[]
    OR?: FavoritScalarWhereWithAggregatesInput[]
    NOT?: FavoritScalarWhereWithAggregatesInput | FavoritScalarWhereWithAggregatesInput[]
    id_favorit?: IntWithAggregatesFilter<"Favorit"> | number
    id_user?: StringWithAggregatesFilter<"Favorit"> | string
    id_buku?: IntWithAggregatesFilter<"Favorit"> | number
    created_at?: DateTimeWithAggregatesFilter<"Favorit"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Favorit"> | Date | string
  }

  export type UserCreateInput = {
    id_user: string
    nama?: string | null
    npm: string
    no_telp?: string | null
    email: string
    password: string
    alamat?: string | null
    jenis_kelamin?: $Enums.JK | null
    role?: $Enums.Role
    created_at?: Date | string
    updated_at?: Date | string
    peminjaman?: PeminjamanCreateNestedManyWithoutUserInput
    ratings?: RatingCreateNestedManyWithoutUserInput
    favorit?: FavoritCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id_user: string
    nama?: string | null
    npm: string
    no_telp?: string | null
    email: string
    password: string
    alamat?: string | null
    jenis_kelamin?: $Enums.JK | null
    role?: $Enums.Role
    created_at?: Date | string
    updated_at?: Date | string
    peminjaman?: PeminjamanUncheckedCreateNestedManyWithoutUserInput
    ratings?: RatingUncheckedCreateNestedManyWithoutUserInput
    favorit?: FavoritUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    npm?: StringFieldUpdateOperationsInput | string
    no_telp?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_kelamin?: NullableEnumJKFieldUpdateOperationsInput | $Enums.JK | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    peminjaman?: PeminjamanUpdateManyWithoutUserNestedInput
    ratings?: RatingUpdateManyWithoutUserNestedInput
    favorit?: FavoritUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    npm?: StringFieldUpdateOperationsInput | string
    no_telp?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_kelamin?: NullableEnumJKFieldUpdateOperationsInput | $Enums.JK | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    peminjaman?: PeminjamanUncheckedUpdateManyWithoutUserNestedInput
    ratings?: RatingUncheckedUpdateManyWithoutUserNestedInput
    favorit?: FavoritUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id_user: string
    nama?: string | null
    npm: string
    no_telp?: string | null
    email: string
    password: string
    alamat?: string | null
    jenis_kelamin?: $Enums.JK | null
    role?: $Enums.Role
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    npm?: StringFieldUpdateOperationsInput | string
    no_telp?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_kelamin?: NullableEnumJKFieldUpdateOperationsInput | $Enums.JK | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    npm?: StringFieldUpdateOperationsInput | string
    no_telp?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_kelamin?: NullableEnumJKFieldUpdateOperationsInput | $Enums.JK | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KategoriCreateInput = {
    nama_kategori: string
    deskripsi: string
    created_at?: Date | string
    updated_at?: Date | string
    buku?: BukuCreateNestedManyWithoutKategoriInput
  }

  export type KategoriUncheckedCreateInput = {
    id_kategori?: number
    nama_kategori: string
    deskripsi: string
    created_at?: Date | string
    updated_at?: Date | string
    buku?: BukuUncheckedCreateNestedManyWithoutKategoriInput
  }

  export type KategoriUpdateInput = {
    nama_kategori?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    buku?: BukuUpdateManyWithoutKategoriNestedInput
  }

  export type KategoriUncheckedUpdateInput = {
    id_kategori?: IntFieldUpdateOperationsInput | number
    nama_kategori?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    buku?: BukuUncheckedUpdateManyWithoutKategoriNestedInput
  }

  export type KategoriCreateManyInput = {
    id_kategori?: number
    nama_kategori: string
    deskripsi: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type KategoriUpdateManyMutationInput = {
    nama_kategori?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KategoriUncheckedUpdateManyInput = {
    id_kategori?: IntFieldUpdateOperationsInput | number
    nama_kategori?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BukuCreateInput = {
    judul: string
    penulis: string
    penerbit: string
    tahun_terbit: number
    isbn: string
    stok: number
    cover_buku: string
    sinopsis: string
    rating_rata: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    kategori: KategoriCreateNestedOneWithoutBukuInput
    peminjaman?: PeminjamanCreateNestedManyWithoutBukuInput
    ratings?: RatingCreateNestedManyWithoutBukuInput
    favorit?: FavoritCreateNestedManyWithoutBukuInput
  }

  export type BukuUncheckedCreateInput = {
    id_buku?: number
    id_kategori: number
    judul: string
    penulis: string
    penerbit: string
    tahun_terbit: number
    isbn: string
    stok: number
    cover_buku: string
    sinopsis: string
    rating_rata: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    peminjaman?: PeminjamanUncheckedCreateNestedManyWithoutBukuInput
    ratings?: RatingUncheckedCreateNestedManyWithoutBukuInput
    favorit?: FavoritUncheckedCreateNestedManyWithoutBukuInput
  }

  export type BukuUpdateInput = {
    judul?: StringFieldUpdateOperationsInput | string
    penulis?: StringFieldUpdateOperationsInput | string
    penerbit?: StringFieldUpdateOperationsInput | string
    tahun_terbit?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    stok?: IntFieldUpdateOperationsInput | number
    cover_buku?: StringFieldUpdateOperationsInput | string
    sinopsis?: StringFieldUpdateOperationsInput | string
    rating_rata?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kategori?: KategoriUpdateOneRequiredWithoutBukuNestedInput
    peminjaman?: PeminjamanUpdateManyWithoutBukuNestedInput
    ratings?: RatingUpdateManyWithoutBukuNestedInput
    favorit?: FavoritUpdateManyWithoutBukuNestedInput
  }

  export type BukuUncheckedUpdateInput = {
    id_buku?: IntFieldUpdateOperationsInput | number
    id_kategori?: IntFieldUpdateOperationsInput | number
    judul?: StringFieldUpdateOperationsInput | string
    penulis?: StringFieldUpdateOperationsInput | string
    penerbit?: StringFieldUpdateOperationsInput | string
    tahun_terbit?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    stok?: IntFieldUpdateOperationsInput | number
    cover_buku?: StringFieldUpdateOperationsInput | string
    sinopsis?: StringFieldUpdateOperationsInput | string
    rating_rata?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    peminjaman?: PeminjamanUncheckedUpdateManyWithoutBukuNestedInput
    ratings?: RatingUncheckedUpdateManyWithoutBukuNestedInput
    favorit?: FavoritUncheckedUpdateManyWithoutBukuNestedInput
  }

  export type BukuCreateManyInput = {
    id_buku?: number
    id_kategori: number
    judul: string
    penulis: string
    penerbit: string
    tahun_terbit: number
    isbn: string
    stok: number
    cover_buku: string
    sinopsis: string
    rating_rata: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BukuUpdateManyMutationInput = {
    judul?: StringFieldUpdateOperationsInput | string
    penulis?: StringFieldUpdateOperationsInput | string
    penerbit?: StringFieldUpdateOperationsInput | string
    tahun_terbit?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    stok?: IntFieldUpdateOperationsInput | number
    cover_buku?: StringFieldUpdateOperationsInput | string
    sinopsis?: StringFieldUpdateOperationsInput | string
    rating_rata?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BukuUncheckedUpdateManyInput = {
    id_buku?: IntFieldUpdateOperationsInput | number
    id_kategori?: IntFieldUpdateOperationsInput | number
    judul?: StringFieldUpdateOperationsInput | string
    penulis?: StringFieldUpdateOperationsInput | string
    penerbit?: StringFieldUpdateOperationsInput | string
    tahun_terbit?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    stok?: IntFieldUpdateOperationsInput | number
    cover_buku?: StringFieldUpdateOperationsInput | string
    sinopsis?: StringFieldUpdateOperationsInput | string
    rating_rata?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeminjamanCreateInput = {
    kode_peminjaman: string
    tanggal_pinjam: Date | string
    tanggal_kembali: Date | string
    tanggal_dikembalikan?: Date | string | null
    status?: $Enums.StatusPeminjaman
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutPeminjamanInput
    buku: BukuCreateNestedOneWithoutPeminjamanInput
    denda?: DendaCreateNestedOneWithoutPeminjamanInput
  }

  export type PeminjamanUncheckedCreateInput = {
    id_peminjaman?: number
    id_user: string
    id_buku: number
    kode_peminjaman: string
    tanggal_pinjam: Date | string
    tanggal_kembali: Date | string
    tanggal_dikembalikan?: Date | string | null
    status?: $Enums.StatusPeminjaman
    created_at?: Date | string
    updated_at?: Date | string
    denda?: DendaUncheckedCreateNestedOneWithoutPeminjamanInput
  }

  export type PeminjamanUpdateInput = {
    kode_peminjaman?: StringFieldUpdateOperationsInput | string
    tanggal_pinjam?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_kembali?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_dikembalikan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumStatusPeminjamanFieldUpdateOperationsInput | $Enums.StatusPeminjaman
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPeminjamanNestedInput
    buku?: BukuUpdateOneRequiredWithoutPeminjamanNestedInput
    denda?: DendaUpdateOneWithoutPeminjamanNestedInput
  }

  export type PeminjamanUncheckedUpdateInput = {
    id_peminjaman?: IntFieldUpdateOperationsInput | number
    id_user?: StringFieldUpdateOperationsInput | string
    id_buku?: IntFieldUpdateOperationsInput | number
    kode_peminjaman?: StringFieldUpdateOperationsInput | string
    tanggal_pinjam?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_kembali?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_dikembalikan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumStatusPeminjamanFieldUpdateOperationsInput | $Enums.StatusPeminjaman
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    denda?: DendaUncheckedUpdateOneWithoutPeminjamanNestedInput
  }

  export type PeminjamanCreateManyInput = {
    id_peminjaman?: number
    id_user: string
    id_buku: number
    kode_peminjaman: string
    tanggal_pinjam: Date | string
    tanggal_kembali: Date | string
    tanggal_dikembalikan?: Date | string | null
    status?: $Enums.StatusPeminjaman
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PeminjamanUpdateManyMutationInput = {
    kode_peminjaman?: StringFieldUpdateOperationsInput | string
    tanggal_pinjam?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_kembali?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_dikembalikan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumStatusPeminjamanFieldUpdateOperationsInput | $Enums.StatusPeminjaman
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeminjamanUncheckedUpdateManyInput = {
    id_peminjaman?: IntFieldUpdateOperationsInput | number
    id_user?: StringFieldUpdateOperationsInput | string
    id_buku?: IntFieldUpdateOperationsInput | number
    kode_peminjaman?: StringFieldUpdateOperationsInput | string
    tanggal_pinjam?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_kembali?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_dikembalikan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumStatusPeminjamanFieldUpdateOperationsInput | $Enums.StatusPeminjaman
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingCreateInput = {
    rating: number
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutRatingsInput
    buku: BukuCreateNestedOneWithoutRatingsInput
  }

  export type RatingUncheckedCreateInput = {
    id_rating?: number
    id_user: string
    id_buku: number
    rating: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RatingUpdateInput = {
    rating?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRatingsNestedInput
    buku?: BukuUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type RatingUncheckedUpdateInput = {
    id_rating?: IntFieldUpdateOperationsInput | number
    id_user?: StringFieldUpdateOperationsInput | string
    id_buku?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingCreateManyInput = {
    id_rating?: number
    id_user: string
    id_buku: number
    rating: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RatingUpdateManyMutationInput = {
    rating?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyInput = {
    id_rating?: IntFieldUpdateOperationsInput | number
    id_user?: StringFieldUpdateOperationsInput | string
    id_buku?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DendaCreateInput = {
    jumlah_denda: Decimal | DecimalJsLike | number | string
    hari_terlambat: number
    keterangan_denda?: $Enums.keteranganDenda
    status_bayar?: $Enums.StatusBayar
    tanggal_bayar?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    peminjaman: PeminjamanCreateNestedOneWithoutDendaInput
  }

  export type DendaUncheckedCreateInput = {
    id_denda?: number
    id_peminjaman: number
    jumlah_denda: Decimal | DecimalJsLike | number | string
    hari_terlambat: number
    keterangan_denda?: $Enums.keteranganDenda
    status_bayar?: $Enums.StatusBayar
    tanggal_bayar?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DendaUpdateInput = {
    jumlah_denda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hari_terlambat?: IntFieldUpdateOperationsInput | number
    keterangan_denda?: EnumketeranganDendaFieldUpdateOperationsInput | $Enums.keteranganDenda
    status_bayar?: EnumStatusBayarFieldUpdateOperationsInput | $Enums.StatusBayar
    tanggal_bayar?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    peminjaman?: PeminjamanUpdateOneRequiredWithoutDendaNestedInput
  }

  export type DendaUncheckedUpdateInput = {
    id_denda?: IntFieldUpdateOperationsInput | number
    id_peminjaman?: IntFieldUpdateOperationsInput | number
    jumlah_denda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hari_terlambat?: IntFieldUpdateOperationsInput | number
    keterangan_denda?: EnumketeranganDendaFieldUpdateOperationsInput | $Enums.keteranganDenda
    status_bayar?: EnumStatusBayarFieldUpdateOperationsInput | $Enums.StatusBayar
    tanggal_bayar?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DendaCreateManyInput = {
    id_denda?: number
    id_peminjaman: number
    jumlah_denda: Decimal | DecimalJsLike | number | string
    hari_terlambat: number
    keterangan_denda?: $Enums.keteranganDenda
    status_bayar?: $Enums.StatusBayar
    tanggal_bayar?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DendaUpdateManyMutationInput = {
    jumlah_denda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hari_terlambat?: IntFieldUpdateOperationsInput | number
    keterangan_denda?: EnumketeranganDendaFieldUpdateOperationsInput | $Enums.keteranganDenda
    status_bayar?: EnumStatusBayarFieldUpdateOperationsInput | $Enums.StatusBayar
    tanggal_bayar?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DendaUncheckedUpdateManyInput = {
    id_denda?: IntFieldUpdateOperationsInput | number
    id_peminjaman?: IntFieldUpdateOperationsInput | number
    jumlah_denda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hari_terlambat?: IntFieldUpdateOperationsInput | number
    keterangan_denda?: EnumketeranganDendaFieldUpdateOperationsInput | $Enums.keteranganDenda
    status_bayar?: EnumStatusBayarFieldUpdateOperationsInput | $Enums.StatusBayar
    tanggal_bayar?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoritCreateInput = {
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutFavoritInput
    buku: BukuCreateNestedOneWithoutFavoritInput
  }

  export type FavoritUncheckedCreateInput = {
    id_favorit?: number
    id_user: string
    id_buku: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FavoritUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritNestedInput
    buku?: BukuUpdateOneRequiredWithoutFavoritNestedInput
  }

  export type FavoritUncheckedUpdateInput = {
    id_favorit?: IntFieldUpdateOperationsInput | number
    id_user?: StringFieldUpdateOperationsInput | string
    id_buku?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoritCreateManyInput = {
    id_favorit?: number
    id_user: string
    id_buku: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FavoritUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoritUncheckedUpdateManyInput = {
    id_favorit?: IntFieldUpdateOperationsInput | number
    id_user?: StringFieldUpdateOperationsInput | string
    id_buku?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumJKNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.JK | EnumJKFieldRefInput<$PrismaModel> | null
    in?: $Enums.JK[] | ListEnumJKFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.JK[] | ListEnumJKFieldRefInput<$PrismaModel> | null
    not?: NestedEnumJKNullableFilter<$PrismaModel> | $Enums.JK | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type PeminjamanListRelationFilter = {
    every?: PeminjamanWhereInput
    some?: PeminjamanWhereInput
    none?: PeminjamanWhereInput
  }

  export type RatingListRelationFilter = {
    every?: RatingWhereInput
    some?: RatingWhereInput
    none?: RatingWhereInput
  }

  export type FavoritListRelationFilter = {
    every?: FavoritWhereInput
    some?: FavoritWhereInput
    none?: FavoritWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PeminjamanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RatingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FavoritOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id_user?: SortOrder
    nama?: SortOrder
    npm?: SortOrder
    no_telp?: SortOrder
    email?: SortOrder
    password?: SortOrder
    alamat?: SortOrder
    jenis_kelamin?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id_user?: SortOrder
    nama?: SortOrder
    npm?: SortOrder
    no_telp?: SortOrder
    email?: SortOrder
    password?: SortOrder
    alamat?: SortOrder
    jenis_kelamin?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id_user?: SortOrder
    nama?: SortOrder
    npm?: SortOrder
    no_telp?: SortOrder
    email?: SortOrder
    password?: SortOrder
    alamat?: SortOrder
    jenis_kelamin?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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

  export type EnumJKNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JK | EnumJKFieldRefInput<$PrismaModel> | null
    in?: $Enums.JK[] | ListEnumJKFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.JK[] | ListEnumJKFieldRefInput<$PrismaModel> | null
    not?: NestedEnumJKNullableWithAggregatesFilter<$PrismaModel> | $Enums.JK | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumJKNullableFilter<$PrismaModel>
    _max?: NestedEnumJKNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type BukuListRelationFilter = {
    every?: BukuWhereInput
    some?: BukuWhereInput
    none?: BukuWhereInput
  }

  export type BukuOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KategoriCountOrderByAggregateInput = {
    id_kategori?: SortOrder
    nama_kategori?: SortOrder
    deskripsi?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type KategoriAvgOrderByAggregateInput = {
    id_kategori?: SortOrder
  }

  export type KategoriMaxOrderByAggregateInput = {
    id_kategori?: SortOrder
    nama_kategori?: SortOrder
    deskripsi?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type KategoriMinOrderByAggregateInput = {
    id_kategori?: SortOrder
    nama_kategori?: SortOrder
    deskripsi?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type KategoriSumOrderByAggregateInput = {
    id_kategori?: SortOrder
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

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type KategoriScalarRelationFilter = {
    is?: KategoriWhereInput
    isNot?: KategoriWhereInput
  }

  export type BukuCountOrderByAggregateInput = {
    id_buku?: SortOrder
    id_kategori?: SortOrder
    judul?: SortOrder
    penulis?: SortOrder
    penerbit?: SortOrder
    tahun_terbit?: SortOrder
    isbn?: SortOrder
    stok?: SortOrder
    cover_buku?: SortOrder
    sinopsis?: SortOrder
    rating_rata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BukuAvgOrderByAggregateInput = {
    id_buku?: SortOrder
    id_kategori?: SortOrder
    tahun_terbit?: SortOrder
    stok?: SortOrder
    rating_rata?: SortOrder
  }

  export type BukuMaxOrderByAggregateInput = {
    id_buku?: SortOrder
    id_kategori?: SortOrder
    judul?: SortOrder
    penulis?: SortOrder
    penerbit?: SortOrder
    tahun_terbit?: SortOrder
    isbn?: SortOrder
    stok?: SortOrder
    cover_buku?: SortOrder
    sinopsis?: SortOrder
    rating_rata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BukuMinOrderByAggregateInput = {
    id_buku?: SortOrder
    id_kategori?: SortOrder
    judul?: SortOrder
    penulis?: SortOrder
    penerbit?: SortOrder
    tahun_terbit?: SortOrder
    isbn?: SortOrder
    stok?: SortOrder
    cover_buku?: SortOrder
    sinopsis?: SortOrder
    rating_rata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BukuSumOrderByAggregateInput = {
    id_buku?: SortOrder
    id_kategori?: SortOrder
    tahun_terbit?: SortOrder
    stok?: SortOrder
    rating_rata?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumStatusPeminjamanFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusPeminjaman | EnumStatusPeminjamanFieldRefInput<$PrismaModel>
    in?: $Enums.StatusPeminjaman[] | ListEnumStatusPeminjamanFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusPeminjaman[] | ListEnumStatusPeminjamanFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusPeminjamanFilter<$PrismaModel> | $Enums.StatusPeminjaman
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BukuScalarRelationFilter = {
    is?: BukuWhereInput
    isNot?: BukuWhereInput
  }

  export type DendaNullableScalarRelationFilter = {
    is?: DendaWhereInput | null
    isNot?: DendaWhereInput | null
  }

  export type PeminjamanCountOrderByAggregateInput = {
    id_peminjaman?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    kode_peminjaman?: SortOrder
    tanggal_pinjam?: SortOrder
    tanggal_kembali?: SortOrder
    tanggal_dikembalikan?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PeminjamanAvgOrderByAggregateInput = {
    id_peminjaman?: SortOrder
    id_buku?: SortOrder
  }

  export type PeminjamanMaxOrderByAggregateInput = {
    id_peminjaman?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    kode_peminjaman?: SortOrder
    tanggal_pinjam?: SortOrder
    tanggal_kembali?: SortOrder
    tanggal_dikembalikan?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PeminjamanMinOrderByAggregateInput = {
    id_peminjaman?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    kode_peminjaman?: SortOrder
    tanggal_pinjam?: SortOrder
    tanggal_kembali?: SortOrder
    tanggal_dikembalikan?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PeminjamanSumOrderByAggregateInput = {
    id_peminjaman?: SortOrder
    id_buku?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumStatusPeminjamanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusPeminjaman | EnumStatusPeminjamanFieldRefInput<$PrismaModel>
    in?: $Enums.StatusPeminjaman[] | ListEnumStatusPeminjamanFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusPeminjaman[] | ListEnumStatusPeminjamanFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusPeminjamanWithAggregatesFilter<$PrismaModel> | $Enums.StatusPeminjaman
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusPeminjamanFilter<$PrismaModel>
    _max?: NestedEnumStatusPeminjamanFilter<$PrismaModel>
  }

  export type RatingCountOrderByAggregateInput = {
    id_rating?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    rating?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RatingAvgOrderByAggregateInput = {
    id_rating?: SortOrder
    id_buku?: SortOrder
    rating?: SortOrder
  }

  export type RatingMaxOrderByAggregateInput = {
    id_rating?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    rating?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RatingMinOrderByAggregateInput = {
    id_rating?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    rating?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RatingSumOrderByAggregateInput = {
    id_rating?: SortOrder
    id_buku?: SortOrder
    rating?: SortOrder
  }

  export type EnumketeranganDendaFilter<$PrismaModel = never> = {
    equals?: $Enums.keteranganDenda | EnumketeranganDendaFieldRefInput<$PrismaModel>
    in?: $Enums.keteranganDenda[] | ListEnumketeranganDendaFieldRefInput<$PrismaModel>
    notIn?: $Enums.keteranganDenda[] | ListEnumketeranganDendaFieldRefInput<$PrismaModel>
    not?: NestedEnumketeranganDendaFilter<$PrismaModel> | $Enums.keteranganDenda
  }

  export type EnumStatusBayarFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusBayar | EnumStatusBayarFieldRefInput<$PrismaModel>
    in?: $Enums.StatusBayar[] | ListEnumStatusBayarFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusBayar[] | ListEnumStatusBayarFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusBayarFilter<$PrismaModel> | $Enums.StatusBayar
  }

  export type PeminjamanScalarRelationFilter = {
    is?: PeminjamanWhereInput
    isNot?: PeminjamanWhereInput
  }

  export type DendaCountOrderByAggregateInput = {
    id_denda?: SortOrder
    id_peminjaman?: SortOrder
    jumlah_denda?: SortOrder
    hari_terlambat?: SortOrder
    keterangan_denda?: SortOrder
    status_bayar?: SortOrder
    tanggal_bayar?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DendaAvgOrderByAggregateInput = {
    id_denda?: SortOrder
    id_peminjaman?: SortOrder
    jumlah_denda?: SortOrder
    hari_terlambat?: SortOrder
  }

  export type DendaMaxOrderByAggregateInput = {
    id_denda?: SortOrder
    id_peminjaman?: SortOrder
    jumlah_denda?: SortOrder
    hari_terlambat?: SortOrder
    keterangan_denda?: SortOrder
    status_bayar?: SortOrder
    tanggal_bayar?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DendaMinOrderByAggregateInput = {
    id_denda?: SortOrder
    id_peminjaman?: SortOrder
    jumlah_denda?: SortOrder
    hari_terlambat?: SortOrder
    keterangan_denda?: SortOrder
    status_bayar?: SortOrder
    tanggal_bayar?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DendaSumOrderByAggregateInput = {
    id_denda?: SortOrder
    id_peminjaman?: SortOrder
    jumlah_denda?: SortOrder
    hari_terlambat?: SortOrder
  }

  export type EnumketeranganDendaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.keteranganDenda | EnumketeranganDendaFieldRefInput<$PrismaModel>
    in?: $Enums.keteranganDenda[] | ListEnumketeranganDendaFieldRefInput<$PrismaModel>
    notIn?: $Enums.keteranganDenda[] | ListEnumketeranganDendaFieldRefInput<$PrismaModel>
    not?: NestedEnumketeranganDendaWithAggregatesFilter<$PrismaModel> | $Enums.keteranganDenda
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumketeranganDendaFilter<$PrismaModel>
    _max?: NestedEnumketeranganDendaFilter<$PrismaModel>
  }

  export type EnumStatusBayarWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusBayar | EnumStatusBayarFieldRefInput<$PrismaModel>
    in?: $Enums.StatusBayar[] | ListEnumStatusBayarFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusBayar[] | ListEnumStatusBayarFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusBayarWithAggregatesFilter<$PrismaModel> | $Enums.StatusBayar
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusBayarFilter<$PrismaModel>
    _max?: NestedEnumStatusBayarFilter<$PrismaModel>
  }

  export type FavoritCountOrderByAggregateInput = {
    id_favorit?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FavoritAvgOrderByAggregateInput = {
    id_favorit?: SortOrder
    id_buku?: SortOrder
  }

  export type FavoritMaxOrderByAggregateInput = {
    id_favorit?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FavoritMinOrderByAggregateInput = {
    id_favorit?: SortOrder
    id_user?: SortOrder
    id_buku?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FavoritSumOrderByAggregateInput = {
    id_favorit?: SortOrder
    id_buku?: SortOrder
  }

  export type PeminjamanCreateNestedManyWithoutUserInput = {
    create?: XOR<PeminjamanCreateWithoutUserInput, PeminjamanUncheckedCreateWithoutUserInput> | PeminjamanCreateWithoutUserInput[] | PeminjamanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PeminjamanCreateOrConnectWithoutUserInput | PeminjamanCreateOrConnectWithoutUserInput[]
    createMany?: PeminjamanCreateManyUserInputEnvelope
    connect?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
  }

  export type RatingCreateNestedManyWithoutUserInput = {
    create?: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput> | RatingCreateWithoutUserInput[] | RatingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutUserInput | RatingCreateOrConnectWithoutUserInput[]
    createMany?: RatingCreateManyUserInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type FavoritCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoritCreateWithoutUserInput, FavoritUncheckedCreateWithoutUserInput> | FavoritCreateWithoutUserInput[] | FavoritUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoritCreateOrConnectWithoutUserInput | FavoritCreateOrConnectWithoutUserInput[]
    createMany?: FavoritCreateManyUserInputEnvelope
    connect?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
  }

  export type PeminjamanUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PeminjamanCreateWithoutUserInput, PeminjamanUncheckedCreateWithoutUserInput> | PeminjamanCreateWithoutUserInput[] | PeminjamanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PeminjamanCreateOrConnectWithoutUserInput | PeminjamanCreateOrConnectWithoutUserInput[]
    createMany?: PeminjamanCreateManyUserInputEnvelope
    connect?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
  }

  export type RatingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput> | RatingCreateWithoutUserInput[] | RatingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutUserInput | RatingCreateOrConnectWithoutUserInput[]
    createMany?: RatingCreateManyUserInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type FavoritUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoritCreateWithoutUserInput, FavoritUncheckedCreateWithoutUserInput> | FavoritCreateWithoutUserInput[] | FavoritUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoritCreateOrConnectWithoutUserInput | FavoritCreateOrConnectWithoutUserInput[]
    createMany?: FavoritCreateManyUserInputEnvelope
    connect?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumJKFieldUpdateOperationsInput = {
    set?: $Enums.JK | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PeminjamanUpdateManyWithoutUserNestedInput = {
    create?: XOR<PeminjamanCreateWithoutUserInput, PeminjamanUncheckedCreateWithoutUserInput> | PeminjamanCreateWithoutUserInput[] | PeminjamanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PeminjamanCreateOrConnectWithoutUserInput | PeminjamanCreateOrConnectWithoutUserInput[]
    upsert?: PeminjamanUpsertWithWhereUniqueWithoutUserInput | PeminjamanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PeminjamanCreateManyUserInputEnvelope
    set?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    disconnect?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    delete?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    connect?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    update?: PeminjamanUpdateWithWhereUniqueWithoutUserInput | PeminjamanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PeminjamanUpdateManyWithWhereWithoutUserInput | PeminjamanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PeminjamanScalarWhereInput | PeminjamanScalarWhereInput[]
  }

  export type RatingUpdateManyWithoutUserNestedInput = {
    create?: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput> | RatingCreateWithoutUserInput[] | RatingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutUserInput | RatingCreateOrConnectWithoutUserInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutUserInput | RatingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RatingCreateManyUserInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutUserInput | RatingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutUserInput | RatingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type FavoritUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoritCreateWithoutUserInput, FavoritUncheckedCreateWithoutUserInput> | FavoritCreateWithoutUserInput[] | FavoritUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoritCreateOrConnectWithoutUserInput | FavoritCreateOrConnectWithoutUserInput[]
    upsert?: FavoritUpsertWithWhereUniqueWithoutUserInput | FavoritUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoritCreateManyUserInputEnvelope
    set?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    disconnect?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    delete?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    connect?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    update?: FavoritUpdateWithWhereUniqueWithoutUserInput | FavoritUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoritUpdateManyWithWhereWithoutUserInput | FavoritUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoritScalarWhereInput | FavoritScalarWhereInput[]
  }

  export type PeminjamanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PeminjamanCreateWithoutUserInput, PeminjamanUncheckedCreateWithoutUserInput> | PeminjamanCreateWithoutUserInput[] | PeminjamanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PeminjamanCreateOrConnectWithoutUserInput | PeminjamanCreateOrConnectWithoutUserInput[]
    upsert?: PeminjamanUpsertWithWhereUniqueWithoutUserInput | PeminjamanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PeminjamanCreateManyUserInputEnvelope
    set?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    disconnect?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    delete?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    connect?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    update?: PeminjamanUpdateWithWhereUniqueWithoutUserInput | PeminjamanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PeminjamanUpdateManyWithWhereWithoutUserInput | PeminjamanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PeminjamanScalarWhereInput | PeminjamanScalarWhereInput[]
  }

  export type RatingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput> | RatingCreateWithoutUserInput[] | RatingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutUserInput | RatingCreateOrConnectWithoutUserInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutUserInput | RatingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RatingCreateManyUserInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutUserInput | RatingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutUserInput | RatingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type FavoritUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoritCreateWithoutUserInput, FavoritUncheckedCreateWithoutUserInput> | FavoritCreateWithoutUserInput[] | FavoritUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoritCreateOrConnectWithoutUserInput | FavoritCreateOrConnectWithoutUserInput[]
    upsert?: FavoritUpsertWithWhereUniqueWithoutUserInput | FavoritUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoritCreateManyUserInputEnvelope
    set?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    disconnect?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    delete?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    connect?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    update?: FavoritUpdateWithWhereUniqueWithoutUserInput | FavoritUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoritUpdateManyWithWhereWithoutUserInput | FavoritUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoritScalarWhereInput | FavoritScalarWhereInput[]
  }

  export type BukuCreateNestedManyWithoutKategoriInput = {
    create?: XOR<BukuCreateWithoutKategoriInput, BukuUncheckedCreateWithoutKategoriInput> | BukuCreateWithoutKategoriInput[] | BukuUncheckedCreateWithoutKategoriInput[]
    connectOrCreate?: BukuCreateOrConnectWithoutKategoriInput | BukuCreateOrConnectWithoutKategoriInput[]
    createMany?: BukuCreateManyKategoriInputEnvelope
    connect?: BukuWhereUniqueInput | BukuWhereUniqueInput[]
  }

  export type BukuUncheckedCreateNestedManyWithoutKategoriInput = {
    create?: XOR<BukuCreateWithoutKategoriInput, BukuUncheckedCreateWithoutKategoriInput> | BukuCreateWithoutKategoriInput[] | BukuUncheckedCreateWithoutKategoriInput[]
    connectOrCreate?: BukuCreateOrConnectWithoutKategoriInput | BukuCreateOrConnectWithoutKategoriInput[]
    createMany?: BukuCreateManyKategoriInputEnvelope
    connect?: BukuWhereUniqueInput | BukuWhereUniqueInput[]
  }

  export type BukuUpdateManyWithoutKategoriNestedInput = {
    create?: XOR<BukuCreateWithoutKategoriInput, BukuUncheckedCreateWithoutKategoriInput> | BukuCreateWithoutKategoriInput[] | BukuUncheckedCreateWithoutKategoriInput[]
    connectOrCreate?: BukuCreateOrConnectWithoutKategoriInput | BukuCreateOrConnectWithoutKategoriInput[]
    upsert?: BukuUpsertWithWhereUniqueWithoutKategoriInput | BukuUpsertWithWhereUniqueWithoutKategoriInput[]
    createMany?: BukuCreateManyKategoriInputEnvelope
    set?: BukuWhereUniqueInput | BukuWhereUniqueInput[]
    disconnect?: BukuWhereUniqueInput | BukuWhereUniqueInput[]
    delete?: BukuWhereUniqueInput | BukuWhereUniqueInput[]
    connect?: BukuWhereUniqueInput | BukuWhereUniqueInput[]
    update?: BukuUpdateWithWhereUniqueWithoutKategoriInput | BukuUpdateWithWhereUniqueWithoutKategoriInput[]
    updateMany?: BukuUpdateManyWithWhereWithoutKategoriInput | BukuUpdateManyWithWhereWithoutKategoriInput[]
    deleteMany?: BukuScalarWhereInput | BukuScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BukuUncheckedUpdateManyWithoutKategoriNestedInput = {
    create?: XOR<BukuCreateWithoutKategoriInput, BukuUncheckedCreateWithoutKategoriInput> | BukuCreateWithoutKategoriInput[] | BukuUncheckedCreateWithoutKategoriInput[]
    connectOrCreate?: BukuCreateOrConnectWithoutKategoriInput | BukuCreateOrConnectWithoutKategoriInput[]
    upsert?: BukuUpsertWithWhereUniqueWithoutKategoriInput | BukuUpsertWithWhereUniqueWithoutKategoriInput[]
    createMany?: BukuCreateManyKategoriInputEnvelope
    set?: BukuWhereUniqueInput | BukuWhereUniqueInput[]
    disconnect?: BukuWhereUniqueInput | BukuWhereUniqueInput[]
    delete?: BukuWhereUniqueInput | BukuWhereUniqueInput[]
    connect?: BukuWhereUniqueInput | BukuWhereUniqueInput[]
    update?: BukuUpdateWithWhereUniqueWithoutKategoriInput | BukuUpdateWithWhereUniqueWithoutKategoriInput[]
    updateMany?: BukuUpdateManyWithWhereWithoutKategoriInput | BukuUpdateManyWithWhereWithoutKategoriInput[]
    deleteMany?: BukuScalarWhereInput | BukuScalarWhereInput[]
  }

  export type KategoriCreateNestedOneWithoutBukuInput = {
    create?: XOR<KategoriCreateWithoutBukuInput, KategoriUncheckedCreateWithoutBukuInput>
    connectOrCreate?: KategoriCreateOrConnectWithoutBukuInput
    connect?: KategoriWhereUniqueInput
  }

  export type PeminjamanCreateNestedManyWithoutBukuInput = {
    create?: XOR<PeminjamanCreateWithoutBukuInput, PeminjamanUncheckedCreateWithoutBukuInput> | PeminjamanCreateWithoutBukuInput[] | PeminjamanUncheckedCreateWithoutBukuInput[]
    connectOrCreate?: PeminjamanCreateOrConnectWithoutBukuInput | PeminjamanCreateOrConnectWithoutBukuInput[]
    createMany?: PeminjamanCreateManyBukuInputEnvelope
    connect?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
  }

  export type RatingCreateNestedManyWithoutBukuInput = {
    create?: XOR<RatingCreateWithoutBukuInput, RatingUncheckedCreateWithoutBukuInput> | RatingCreateWithoutBukuInput[] | RatingUncheckedCreateWithoutBukuInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutBukuInput | RatingCreateOrConnectWithoutBukuInput[]
    createMany?: RatingCreateManyBukuInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type FavoritCreateNestedManyWithoutBukuInput = {
    create?: XOR<FavoritCreateWithoutBukuInput, FavoritUncheckedCreateWithoutBukuInput> | FavoritCreateWithoutBukuInput[] | FavoritUncheckedCreateWithoutBukuInput[]
    connectOrCreate?: FavoritCreateOrConnectWithoutBukuInput | FavoritCreateOrConnectWithoutBukuInput[]
    createMany?: FavoritCreateManyBukuInputEnvelope
    connect?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
  }

  export type PeminjamanUncheckedCreateNestedManyWithoutBukuInput = {
    create?: XOR<PeminjamanCreateWithoutBukuInput, PeminjamanUncheckedCreateWithoutBukuInput> | PeminjamanCreateWithoutBukuInput[] | PeminjamanUncheckedCreateWithoutBukuInput[]
    connectOrCreate?: PeminjamanCreateOrConnectWithoutBukuInput | PeminjamanCreateOrConnectWithoutBukuInput[]
    createMany?: PeminjamanCreateManyBukuInputEnvelope
    connect?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
  }

  export type RatingUncheckedCreateNestedManyWithoutBukuInput = {
    create?: XOR<RatingCreateWithoutBukuInput, RatingUncheckedCreateWithoutBukuInput> | RatingCreateWithoutBukuInput[] | RatingUncheckedCreateWithoutBukuInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutBukuInput | RatingCreateOrConnectWithoutBukuInput[]
    createMany?: RatingCreateManyBukuInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type FavoritUncheckedCreateNestedManyWithoutBukuInput = {
    create?: XOR<FavoritCreateWithoutBukuInput, FavoritUncheckedCreateWithoutBukuInput> | FavoritCreateWithoutBukuInput[] | FavoritUncheckedCreateWithoutBukuInput[]
    connectOrCreate?: FavoritCreateOrConnectWithoutBukuInput | FavoritCreateOrConnectWithoutBukuInput[]
    createMany?: FavoritCreateManyBukuInputEnvelope
    connect?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type KategoriUpdateOneRequiredWithoutBukuNestedInput = {
    create?: XOR<KategoriCreateWithoutBukuInput, KategoriUncheckedCreateWithoutBukuInput>
    connectOrCreate?: KategoriCreateOrConnectWithoutBukuInput
    upsert?: KategoriUpsertWithoutBukuInput
    connect?: KategoriWhereUniqueInput
    update?: XOR<XOR<KategoriUpdateToOneWithWhereWithoutBukuInput, KategoriUpdateWithoutBukuInput>, KategoriUncheckedUpdateWithoutBukuInput>
  }

  export type PeminjamanUpdateManyWithoutBukuNestedInput = {
    create?: XOR<PeminjamanCreateWithoutBukuInput, PeminjamanUncheckedCreateWithoutBukuInput> | PeminjamanCreateWithoutBukuInput[] | PeminjamanUncheckedCreateWithoutBukuInput[]
    connectOrCreate?: PeminjamanCreateOrConnectWithoutBukuInput | PeminjamanCreateOrConnectWithoutBukuInput[]
    upsert?: PeminjamanUpsertWithWhereUniqueWithoutBukuInput | PeminjamanUpsertWithWhereUniqueWithoutBukuInput[]
    createMany?: PeminjamanCreateManyBukuInputEnvelope
    set?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    disconnect?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    delete?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    connect?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    update?: PeminjamanUpdateWithWhereUniqueWithoutBukuInput | PeminjamanUpdateWithWhereUniqueWithoutBukuInput[]
    updateMany?: PeminjamanUpdateManyWithWhereWithoutBukuInput | PeminjamanUpdateManyWithWhereWithoutBukuInput[]
    deleteMany?: PeminjamanScalarWhereInput | PeminjamanScalarWhereInput[]
  }

  export type RatingUpdateManyWithoutBukuNestedInput = {
    create?: XOR<RatingCreateWithoutBukuInput, RatingUncheckedCreateWithoutBukuInput> | RatingCreateWithoutBukuInput[] | RatingUncheckedCreateWithoutBukuInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutBukuInput | RatingCreateOrConnectWithoutBukuInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutBukuInput | RatingUpsertWithWhereUniqueWithoutBukuInput[]
    createMany?: RatingCreateManyBukuInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutBukuInput | RatingUpdateWithWhereUniqueWithoutBukuInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutBukuInput | RatingUpdateManyWithWhereWithoutBukuInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type FavoritUpdateManyWithoutBukuNestedInput = {
    create?: XOR<FavoritCreateWithoutBukuInput, FavoritUncheckedCreateWithoutBukuInput> | FavoritCreateWithoutBukuInput[] | FavoritUncheckedCreateWithoutBukuInput[]
    connectOrCreate?: FavoritCreateOrConnectWithoutBukuInput | FavoritCreateOrConnectWithoutBukuInput[]
    upsert?: FavoritUpsertWithWhereUniqueWithoutBukuInput | FavoritUpsertWithWhereUniqueWithoutBukuInput[]
    createMany?: FavoritCreateManyBukuInputEnvelope
    set?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    disconnect?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    delete?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    connect?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    update?: FavoritUpdateWithWhereUniqueWithoutBukuInput | FavoritUpdateWithWhereUniqueWithoutBukuInput[]
    updateMany?: FavoritUpdateManyWithWhereWithoutBukuInput | FavoritUpdateManyWithWhereWithoutBukuInput[]
    deleteMany?: FavoritScalarWhereInput | FavoritScalarWhereInput[]
  }

  export type PeminjamanUncheckedUpdateManyWithoutBukuNestedInput = {
    create?: XOR<PeminjamanCreateWithoutBukuInput, PeminjamanUncheckedCreateWithoutBukuInput> | PeminjamanCreateWithoutBukuInput[] | PeminjamanUncheckedCreateWithoutBukuInput[]
    connectOrCreate?: PeminjamanCreateOrConnectWithoutBukuInput | PeminjamanCreateOrConnectWithoutBukuInput[]
    upsert?: PeminjamanUpsertWithWhereUniqueWithoutBukuInput | PeminjamanUpsertWithWhereUniqueWithoutBukuInput[]
    createMany?: PeminjamanCreateManyBukuInputEnvelope
    set?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    disconnect?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    delete?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    connect?: PeminjamanWhereUniqueInput | PeminjamanWhereUniqueInput[]
    update?: PeminjamanUpdateWithWhereUniqueWithoutBukuInput | PeminjamanUpdateWithWhereUniqueWithoutBukuInput[]
    updateMany?: PeminjamanUpdateManyWithWhereWithoutBukuInput | PeminjamanUpdateManyWithWhereWithoutBukuInput[]
    deleteMany?: PeminjamanScalarWhereInput | PeminjamanScalarWhereInput[]
  }

  export type RatingUncheckedUpdateManyWithoutBukuNestedInput = {
    create?: XOR<RatingCreateWithoutBukuInput, RatingUncheckedCreateWithoutBukuInput> | RatingCreateWithoutBukuInput[] | RatingUncheckedCreateWithoutBukuInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutBukuInput | RatingCreateOrConnectWithoutBukuInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutBukuInput | RatingUpsertWithWhereUniqueWithoutBukuInput[]
    createMany?: RatingCreateManyBukuInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutBukuInput | RatingUpdateWithWhereUniqueWithoutBukuInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutBukuInput | RatingUpdateManyWithWhereWithoutBukuInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type FavoritUncheckedUpdateManyWithoutBukuNestedInput = {
    create?: XOR<FavoritCreateWithoutBukuInput, FavoritUncheckedCreateWithoutBukuInput> | FavoritCreateWithoutBukuInput[] | FavoritUncheckedCreateWithoutBukuInput[]
    connectOrCreate?: FavoritCreateOrConnectWithoutBukuInput | FavoritCreateOrConnectWithoutBukuInput[]
    upsert?: FavoritUpsertWithWhereUniqueWithoutBukuInput | FavoritUpsertWithWhereUniqueWithoutBukuInput[]
    createMany?: FavoritCreateManyBukuInputEnvelope
    set?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    disconnect?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    delete?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    connect?: FavoritWhereUniqueInput | FavoritWhereUniqueInput[]
    update?: FavoritUpdateWithWhereUniqueWithoutBukuInput | FavoritUpdateWithWhereUniqueWithoutBukuInput[]
    updateMany?: FavoritUpdateManyWithWhereWithoutBukuInput | FavoritUpdateManyWithWhereWithoutBukuInput[]
    deleteMany?: FavoritScalarWhereInput | FavoritScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPeminjamanInput = {
    create?: XOR<UserCreateWithoutPeminjamanInput, UserUncheckedCreateWithoutPeminjamanInput>
    connectOrCreate?: UserCreateOrConnectWithoutPeminjamanInput
    connect?: UserWhereUniqueInput
  }

  export type BukuCreateNestedOneWithoutPeminjamanInput = {
    create?: XOR<BukuCreateWithoutPeminjamanInput, BukuUncheckedCreateWithoutPeminjamanInput>
    connectOrCreate?: BukuCreateOrConnectWithoutPeminjamanInput
    connect?: BukuWhereUniqueInput
  }

  export type DendaCreateNestedOneWithoutPeminjamanInput = {
    create?: XOR<DendaCreateWithoutPeminjamanInput, DendaUncheckedCreateWithoutPeminjamanInput>
    connectOrCreate?: DendaCreateOrConnectWithoutPeminjamanInput
    connect?: DendaWhereUniqueInput
  }

  export type DendaUncheckedCreateNestedOneWithoutPeminjamanInput = {
    create?: XOR<DendaCreateWithoutPeminjamanInput, DendaUncheckedCreateWithoutPeminjamanInput>
    connectOrCreate?: DendaCreateOrConnectWithoutPeminjamanInput
    connect?: DendaWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumStatusPeminjamanFieldUpdateOperationsInput = {
    set?: $Enums.StatusPeminjaman
  }

  export type UserUpdateOneRequiredWithoutPeminjamanNestedInput = {
    create?: XOR<UserCreateWithoutPeminjamanInput, UserUncheckedCreateWithoutPeminjamanInput>
    connectOrCreate?: UserCreateOrConnectWithoutPeminjamanInput
    upsert?: UserUpsertWithoutPeminjamanInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPeminjamanInput, UserUpdateWithoutPeminjamanInput>, UserUncheckedUpdateWithoutPeminjamanInput>
  }

  export type BukuUpdateOneRequiredWithoutPeminjamanNestedInput = {
    create?: XOR<BukuCreateWithoutPeminjamanInput, BukuUncheckedCreateWithoutPeminjamanInput>
    connectOrCreate?: BukuCreateOrConnectWithoutPeminjamanInput
    upsert?: BukuUpsertWithoutPeminjamanInput
    connect?: BukuWhereUniqueInput
    update?: XOR<XOR<BukuUpdateToOneWithWhereWithoutPeminjamanInput, BukuUpdateWithoutPeminjamanInput>, BukuUncheckedUpdateWithoutPeminjamanInput>
  }

  export type DendaUpdateOneWithoutPeminjamanNestedInput = {
    create?: XOR<DendaCreateWithoutPeminjamanInput, DendaUncheckedCreateWithoutPeminjamanInput>
    connectOrCreate?: DendaCreateOrConnectWithoutPeminjamanInput
    upsert?: DendaUpsertWithoutPeminjamanInput
    disconnect?: DendaWhereInput | boolean
    delete?: DendaWhereInput | boolean
    connect?: DendaWhereUniqueInput
    update?: XOR<XOR<DendaUpdateToOneWithWhereWithoutPeminjamanInput, DendaUpdateWithoutPeminjamanInput>, DendaUncheckedUpdateWithoutPeminjamanInput>
  }

  export type DendaUncheckedUpdateOneWithoutPeminjamanNestedInput = {
    create?: XOR<DendaCreateWithoutPeminjamanInput, DendaUncheckedCreateWithoutPeminjamanInput>
    connectOrCreate?: DendaCreateOrConnectWithoutPeminjamanInput
    upsert?: DendaUpsertWithoutPeminjamanInput
    disconnect?: DendaWhereInput | boolean
    delete?: DendaWhereInput | boolean
    connect?: DendaWhereUniqueInput
    update?: XOR<XOR<DendaUpdateToOneWithWhereWithoutPeminjamanInput, DendaUpdateWithoutPeminjamanInput>, DendaUncheckedUpdateWithoutPeminjamanInput>
  }

  export type UserCreateNestedOneWithoutRatingsInput = {
    create?: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingsInput
    connect?: UserWhereUniqueInput
  }

  export type BukuCreateNestedOneWithoutRatingsInput = {
    create?: XOR<BukuCreateWithoutRatingsInput, BukuUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: BukuCreateOrConnectWithoutRatingsInput
    connect?: BukuWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingsInput
    upsert?: UserUpsertWithoutRatingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRatingsInput, UserUpdateWithoutRatingsInput>, UserUncheckedUpdateWithoutRatingsInput>
  }

  export type BukuUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: XOR<BukuCreateWithoutRatingsInput, BukuUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: BukuCreateOrConnectWithoutRatingsInput
    upsert?: BukuUpsertWithoutRatingsInput
    connect?: BukuWhereUniqueInput
    update?: XOR<XOR<BukuUpdateToOneWithWhereWithoutRatingsInput, BukuUpdateWithoutRatingsInput>, BukuUncheckedUpdateWithoutRatingsInput>
  }

  export type PeminjamanCreateNestedOneWithoutDendaInput = {
    create?: XOR<PeminjamanCreateWithoutDendaInput, PeminjamanUncheckedCreateWithoutDendaInput>
    connectOrCreate?: PeminjamanCreateOrConnectWithoutDendaInput
    connect?: PeminjamanWhereUniqueInput
  }

  export type EnumketeranganDendaFieldUpdateOperationsInput = {
    set?: $Enums.keteranganDenda
  }

  export type EnumStatusBayarFieldUpdateOperationsInput = {
    set?: $Enums.StatusBayar
  }

  export type PeminjamanUpdateOneRequiredWithoutDendaNestedInput = {
    create?: XOR<PeminjamanCreateWithoutDendaInput, PeminjamanUncheckedCreateWithoutDendaInput>
    connectOrCreate?: PeminjamanCreateOrConnectWithoutDendaInput
    upsert?: PeminjamanUpsertWithoutDendaInput
    connect?: PeminjamanWhereUniqueInput
    update?: XOR<XOR<PeminjamanUpdateToOneWithWhereWithoutDendaInput, PeminjamanUpdateWithoutDendaInput>, PeminjamanUncheckedUpdateWithoutDendaInput>
  }

  export type UserCreateNestedOneWithoutFavoritInput = {
    create?: XOR<UserCreateWithoutFavoritInput, UserUncheckedCreateWithoutFavoritInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritInput
    connect?: UserWhereUniqueInput
  }

  export type BukuCreateNestedOneWithoutFavoritInput = {
    create?: XOR<BukuCreateWithoutFavoritInput, BukuUncheckedCreateWithoutFavoritInput>
    connectOrCreate?: BukuCreateOrConnectWithoutFavoritInput
    connect?: BukuWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFavoritNestedInput = {
    create?: XOR<UserCreateWithoutFavoritInput, UserUncheckedCreateWithoutFavoritInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritInput
    upsert?: UserUpsertWithoutFavoritInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavoritInput, UserUpdateWithoutFavoritInput>, UserUncheckedUpdateWithoutFavoritInput>
  }

  export type BukuUpdateOneRequiredWithoutFavoritNestedInput = {
    create?: XOR<BukuCreateWithoutFavoritInput, BukuUncheckedCreateWithoutFavoritInput>
    connectOrCreate?: BukuCreateOrConnectWithoutFavoritInput
    upsert?: BukuUpsertWithoutFavoritInput
    connect?: BukuWhereUniqueInput
    update?: XOR<XOR<BukuUpdateToOneWithWhereWithoutFavoritInput, BukuUpdateWithoutFavoritInput>, BukuUncheckedUpdateWithoutFavoritInput>
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

  export type NestedEnumJKNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.JK | EnumJKFieldRefInput<$PrismaModel> | null
    in?: $Enums.JK[] | ListEnumJKFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.JK[] | ListEnumJKFieldRefInput<$PrismaModel> | null
    not?: NestedEnumJKNullableFilter<$PrismaModel> | $Enums.JK | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedEnumJKNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JK | EnumJKFieldRefInput<$PrismaModel> | null
    in?: $Enums.JK[] | ListEnumJKFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.JK[] | ListEnumJKFieldRefInput<$PrismaModel> | null
    not?: NestedEnumJKNullableWithAggregatesFilter<$PrismaModel> | $Enums.JK | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumJKNullableFilter<$PrismaModel>
    _max?: NestedEnumJKNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumStatusPeminjamanFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusPeminjaman | EnumStatusPeminjamanFieldRefInput<$PrismaModel>
    in?: $Enums.StatusPeminjaman[] | ListEnumStatusPeminjamanFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusPeminjaman[] | ListEnumStatusPeminjamanFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusPeminjamanFilter<$PrismaModel> | $Enums.StatusPeminjaman
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatusPeminjamanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusPeminjaman | EnumStatusPeminjamanFieldRefInput<$PrismaModel>
    in?: $Enums.StatusPeminjaman[] | ListEnumStatusPeminjamanFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusPeminjaman[] | ListEnumStatusPeminjamanFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusPeminjamanWithAggregatesFilter<$PrismaModel> | $Enums.StatusPeminjaman
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusPeminjamanFilter<$PrismaModel>
    _max?: NestedEnumStatusPeminjamanFilter<$PrismaModel>
  }

  export type NestedEnumketeranganDendaFilter<$PrismaModel = never> = {
    equals?: $Enums.keteranganDenda | EnumketeranganDendaFieldRefInput<$PrismaModel>
    in?: $Enums.keteranganDenda[] | ListEnumketeranganDendaFieldRefInput<$PrismaModel>
    notIn?: $Enums.keteranganDenda[] | ListEnumketeranganDendaFieldRefInput<$PrismaModel>
    not?: NestedEnumketeranganDendaFilter<$PrismaModel> | $Enums.keteranganDenda
  }

  export type NestedEnumStatusBayarFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusBayar | EnumStatusBayarFieldRefInput<$PrismaModel>
    in?: $Enums.StatusBayar[] | ListEnumStatusBayarFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusBayar[] | ListEnumStatusBayarFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusBayarFilter<$PrismaModel> | $Enums.StatusBayar
  }

  export type NestedEnumketeranganDendaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.keteranganDenda | EnumketeranganDendaFieldRefInput<$PrismaModel>
    in?: $Enums.keteranganDenda[] | ListEnumketeranganDendaFieldRefInput<$PrismaModel>
    notIn?: $Enums.keteranganDenda[] | ListEnumketeranganDendaFieldRefInput<$PrismaModel>
    not?: NestedEnumketeranganDendaWithAggregatesFilter<$PrismaModel> | $Enums.keteranganDenda
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumketeranganDendaFilter<$PrismaModel>
    _max?: NestedEnumketeranganDendaFilter<$PrismaModel>
  }

  export type NestedEnumStatusBayarWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusBayar | EnumStatusBayarFieldRefInput<$PrismaModel>
    in?: $Enums.StatusBayar[] | ListEnumStatusBayarFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusBayar[] | ListEnumStatusBayarFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusBayarWithAggregatesFilter<$PrismaModel> | $Enums.StatusBayar
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusBayarFilter<$PrismaModel>
    _max?: NestedEnumStatusBayarFilter<$PrismaModel>
  }

  export type PeminjamanCreateWithoutUserInput = {
    kode_peminjaman: string
    tanggal_pinjam: Date | string
    tanggal_kembali: Date | string
    tanggal_dikembalikan?: Date | string | null
    status?: $Enums.StatusPeminjaman
    created_at?: Date | string
    updated_at?: Date | string
    buku: BukuCreateNestedOneWithoutPeminjamanInput
    denda?: DendaCreateNestedOneWithoutPeminjamanInput
  }

  export type PeminjamanUncheckedCreateWithoutUserInput = {
    id_peminjaman?: number
    id_buku: number
    kode_peminjaman: string
    tanggal_pinjam: Date | string
    tanggal_kembali: Date | string
    tanggal_dikembalikan?: Date | string | null
    status?: $Enums.StatusPeminjaman
    created_at?: Date | string
    updated_at?: Date | string
    denda?: DendaUncheckedCreateNestedOneWithoutPeminjamanInput
  }

  export type PeminjamanCreateOrConnectWithoutUserInput = {
    where: PeminjamanWhereUniqueInput
    create: XOR<PeminjamanCreateWithoutUserInput, PeminjamanUncheckedCreateWithoutUserInput>
  }

  export type PeminjamanCreateManyUserInputEnvelope = {
    data: PeminjamanCreateManyUserInput | PeminjamanCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RatingCreateWithoutUserInput = {
    rating: number
    created_at?: Date | string
    updated_at?: Date | string
    buku: BukuCreateNestedOneWithoutRatingsInput
  }

  export type RatingUncheckedCreateWithoutUserInput = {
    id_rating?: number
    id_buku: number
    rating: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RatingCreateOrConnectWithoutUserInput = {
    where: RatingWhereUniqueInput
    create: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput>
  }

  export type RatingCreateManyUserInputEnvelope = {
    data: RatingCreateManyUserInput | RatingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FavoritCreateWithoutUserInput = {
    created_at?: Date | string
    updated_at?: Date | string
    buku: BukuCreateNestedOneWithoutFavoritInput
  }

  export type FavoritUncheckedCreateWithoutUserInput = {
    id_favorit?: number
    id_buku: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FavoritCreateOrConnectWithoutUserInput = {
    where: FavoritWhereUniqueInput
    create: XOR<FavoritCreateWithoutUserInput, FavoritUncheckedCreateWithoutUserInput>
  }

  export type FavoritCreateManyUserInputEnvelope = {
    data: FavoritCreateManyUserInput | FavoritCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PeminjamanUpsertWithWhereUniqueWithoutUserInput = {
    where: PeminjamanWhereUniqueInput
    update: XOR<PeminjamanUpdateWithoutUserInput, PeminjamanUncheckedUpdateWithoutUserInput>
    create: XOR<PeminjamanCreateWithoutUserInput, PeminjamanUncheckedCreateWithoutUserInput>
  }

  export type PeminjamanUpdateWithWhereUniqueWithoutUserInput = {
    where: PeminjamanWhereUniqueInput
    data: XOR<PeminjamanUpdateWithoutUserInput, PeminjamanUncheckedUpdateWithoutUserInput>
  }

  export type PeminjamanUpdateManyWithWhereWithoutUserInput = {
    where: PeminjamanScalarWhereInput
    data: XOR<PeminjamanUpdateManyMutationInput, PeminjamanUncheckedUpdateManyWithoutUserInput>
  }

  export type PeminjamanScalarWhereInput = {
    AND?: PeminjamanScalarWhereInput | PeminjamanScalarWhereInput[]
    OR?: PeminjamanScalarWhereInput[]
    NOT?: PeminjamanScalarWhereInput | PeminjamanScalarWhereInput[]
    id_peminjaman?: IntFilter<"Peminjaman"> | number
    id_user?: StringFilter<"Peminjaman"> | string
    id_buku?: IntFilter<"Peminjaman"> | number
    kode_peminjaman?: StringFilter<"Peminjaman"> | string
    tanggal_pinjam?: DateTimeFilter<"Peminjaman"> | Date | string
    tanggal_kembali?: DateTimeFilter<"Peminjaman"> | Date | string
    tanggal_dikembalikan?: DateTimeNullableFilter<"Peminjaman"> | Date | string | null
    status?: EnumStatusPeminjamanFilter<"Peminjaman"> | $Enums.StatusPeminjaman
    created_at?: DateTimeFilter<"Peminjaman"> | Date | string
    updated_at?: DateTimeFilter<"Peminjaman"> | Date | string
  }

  export type RatingUpsertWithWhereUniqueWithoutUserInput = {
    where: RatingWhereUniqueInput
    update: XOR<RatingUpdateWithoutUserInput, RatingUncheckedUpdateWithoutUserInput>
    create: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput>
  }

  export type RatingUpdateWithWhereUniqueWithoutUserInput = {
    where: RatingWhereUniqueInput
    data: XOR<RatingUpdateWithoutUserInput, RatingUncheckedUpdateWithoutUserInput>
  }

  export type RatingUpdateManyWithWhereWithoutUserInput = {
    where: RatingScalarWhereInput
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyWithoutUserInput>
  }

  export type RatingScalarWhereInput = {
    AND?: RatingScalarWhereInput | RatingScalarWhereInput[]
    OR?: RatingScalarWhereInput[]
    NOT?: RatingScalarWhereInput | RatingScalarWhereInput[]
    id_rating?: IntFilter<"Rating"> | number
    id_user?: StringFilter<"Rating"> | string
    id_buku?: IntFilter<"Rating"> | number
    rating?: IntFilter<"Rating"> | number
    created_at?: DateTimeFilter<"Rating"> | Date | string
    updated_at?: DateTimeFilter<"Rating"> | Date | string
  }

  export type FavoritUpsertWithWhereUniqueWithoutUserInput = {
    where: FavoritWhereUniqueInput
    update: XOR<FavoritUpdateWithoutUserInput, FavoritUncheckedUpdateWithoutUserInput>
    create: XOR<FavoritCreateWithoutUserInput, FavoritUncheckedCreateWithoutUserInput>
  }

  export type FavoritUpdateWithWhereUniqueWithoutUserInput = {
    where: FavoritWhereUniqueInput
    data: XOR<FavoritUpdateWithoutUserInput, FavoritUncheckedUpdateWithoutUserInput>
  }

  export type FavoritUpdateManyWithWhereWithoutUserInput = {
    where: FavoritScalarWhereInput
    data: XOR<FavoritUpdateManyMutationInput, FavoritUncheckedUpdateManyWithoutUserInput>
  }

  export type FavoritScalarWhereInput = {
    AND?: FavoritScalarWhereInput | FavoritScalarWhereInput[]
    OR?: FavoritScalarWhereInput[]
    NOT?: FavoritScalarWhereInput | FavoritScalarWhereInput[]
    id_favorit?: IntFilter<"Favorit"> | number
    id_user?: StringFilter<"Favorit"> | string
    id_buku?: IntFilter<"Favorit"> | number
    created_at?: DateTimeFilter<"Favorit"> | Date | string
    updated_at?: DateTimeFilter<"Favorit"> | Date | string
  }

  export type BukuCreateWithoutKategoriInput = {
    judul: string
    penulis: string
    penerbit: string
    tahun_terbit: number
    isbn: string
    stok: number
    cover_buku: string
    sinopsis: string
    rating_rata: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    peminjaman?: PeminjamanCreateNestedManyWithoutBukuInput
    ratings?: RatingCreateNestedManyWithoutBukuInput
    favorit?: FavoritCreateNestedManyWithoutBukuInput
  }

  export type BukuUncheckedCreateWithoutKategoriInput = {
    id_buku?: number
    judul: string
    penulis: string
    penerbit: string
    tahun_terbit: number
    isbn: string
    stok: number
    cover_buku: string
    sinopsis: string
    rating_rata: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    peminjaman?: PeminjamanUncheckedCreateNestedManyWithoutBukuInput
    ratings?: RatingUncheckedCreateNestedManyWithoutBukuInput
    favorit?: FavoritUncheckedCreateNestedManyWithoutBukuInput
  }

  export type BukuCreateOrConnectWithoutKategoriInput = {
    where: BukuWhereUniqueInput
    create: XOR<BukuCreateWithoutKategoriInput, BukuUncheckedCreateWithoutKategoriInput>
  }

  export type BukuCreateManyKategoriInputEnvelope = {
    data: BukuCreateManyKategoriInput | BukuCreateManyKategoriInput[]
    skipDuplicates?: boolean
  }

  export type BukuUpsertWithWhereUniqueWithoutKategoriInput = {
    where: BukuWhereUniqueInput
    update: XOR<BukuUpdateWithoutKategoriInput, BukuUncheckedUpdateWithoutKategoriInput>
    create: XOR<BukuCreateWithoutKategoriInput, BukuUncheckedCreateWithoutKategoriInput>
  }

  export type BukuUpdateWithWhereUniqueWithoutKategoriInput = {
    where: BukuWhereUniqueInput
    data: XOR<BukuUpdateWithoutKategoriInput, BukuUncheckedUpdateWithoutKategoriInput>
  }

  export type BukuUpdateManyWithWhereWithoutKategoriInput = {
    where: BukuScalarWhereInput
    data: XOR<BukuUpdateManyMutationInput, BukuUncheckedUpdateManyWithoutKategoriInput>
  }

  export type BukuScalarWhereInput = {
    AND?: BukuScalarWhereInput | BukuScalarWhereInput[]
    OR?: BukuScalarWhereInput[]
    NOT?: BukuScalarWhereInput | BukuScalarWhereInput[]
    id_buku?: IntFilter<"Buku"> | number
    id_kategori?: IntFilter<"Buku"> | number
    judul?: StringFilter<"Buku"> | string
    penulis?: StringFilter<"Buku"> | string
    penerbit?: StringFilter<"Buku"> | string
    tahun_terbit?: IntFilter<"Buku"> | number
    isbn?: StringFilter<"Buku"> | string
    stok?: IntFilter<"Buku"> | number
    cover_buku?: StringFilter<"Buku"> | string
    sinopsis?: StringFilter<"Buku"> | string
    rating_rata?: DecimalFilter<"Buku"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"Buku"> | Date | string
    updated_at?: DateTimeFilter<"Buku"> | Date | string
  }

  export type KategoriCreateWithoutBukuInput = {
    nama_kategori: string
    deskripsi: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type KategoriUncheckedCreateWithoutBukuInput = {
    id_kategori?: number
    nama_kategori: string
    deskripsi: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type KategoriCreateOrConnectWithoutBukuInput = {
    where: KategoriWhereUniqueInput
    create: XOR<KategoriCreateWithoutBukuInput, KategoriUncheckedCreateWithoutBukuInput>
  }

  export type PeminjamanCreateWithoutBukuInput = {
    kode_peminjaman: string
    tanggal_pinjam: Date | string
    tanggal_kembali: Date | string
    tanggal_dikembalikan?: Date | string | null
    status?: $Enums.StatusPeminjaman
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutPeminjamanInput
    denda?: DendaCreateNestedOneWithoutPeminjamanInput
  }

  export type PeminjamanUncheckedCreateWithoutBukuInput = {
    id_peminjaman?: number
    id_user: string
    kode_peminjaman: string
    tanggal_pinjam: Date | string
    tanggal_kembali: Date | string
    tanggal_dikembalikan?: Date | string | null
    status?: $Enums.StatusPeminjaman
    created_at?: Date | string
    updated_at?: Date | string
    denda?: DendaUncheckedCreateNestedOneWithoutPeminjamanInput
  }

  export type PeminjamanCreateOrConnectWithoutBukuInput = {
    where: PeminjamanWhereUniqueInput
    create: XOR<PeminjamanCreateWithoutBukuInput, PeminjamanUncheckedCreateWithoutBukuInput>
  }

  export type PeminjamanCreateManyBukuInputEnvelope = {
    data: PeminjamanCreateManyBukuInput | PeminjamanCreateManyBukuInput[]
    skipDuplicates?: boolean
  }

  export type RatingCreateWithoutBukuInput = {
    rating: number
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutRatingsInput
  }

  export type RatingUncheckedCreateWithoutBukuInput = {
    id_rating?: number
    id_user: string
    rating: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RatingCreateOrConnectWithoutBukuInput = {
    where: RatingWhereUniqueInput
    create: XOR<RatingCreateWithoutBukuInput, RatingUncheckedCreateWithoutBukuInput>
  }

  export type RatingCreateManyBukuInputEnvelope = {
    data: RatingCreateManyBukuInput | RatingCreateManyBukuInput[]
    skipDuplicates?: boolean
  }

  export type FavoritCreateWithoutBukuInput = {
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutFavoritInput
  }

  export type FavoritUncheckedCreateWithoutBukuInput = {
    id_favorit?: number
    id_user: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FavoritCreateOrConnectWithoutBukuInput = {
    where: FavoritWhereUniqueInput
    create: XOR<FavoritCreateWithoutBukuInput, FavoritUncheckedCreateWithoutBukuInput>
  }

  export type FavoritCreateManyBukuInputEnvelope = {
    data: FavoritCreateManyBukuInput | FavoritCreateManyBukuInput[]
    skipDuplicates?: boolean
  }

  export type KategoriUpsertWithoutBukuInput = {
    update: XOR<KategoriUpdateWithoutBukuInput, KategoriUncheckedUpdateWithoutBukuInput>
    create: XOR<KategoriCreateWithoutBukuInput, KategoriUncheckedCreateWithoutBukuInput>
    where?: KategoriWhereInput
  }

  export type KategoriUpdateToOneWithWhereWithoutBukuInput = {
    where?: KategoriWhereInput
    data: XOR<KategoriUpdateWithoutBukuInput, KategoriUncheckedUpdateWithoutBukuInput>
  }

  export type KategoriUpdateWithoutBukuInput = {
    nama_kategori?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KategoriUncheckedUpdateWithoutBukuInput = {
    id_kategori?: IntFieldUpdateOperationsInput | number
    nama_kategori?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeminjamanUpsertWithWhereUniqueWithoutBukuInput = {
    where: PeminjamanWhereUniqueInput
    update: XOR<PeminjamanUpdateWithoutBukuInput, PeminjamanUncheckedUpdateWithoutBukuInput>
    create: XOR<PeminjamanCreateWithoutBukuInput, PeminjamanUncheckedCreateWithoutBukuInput>
  }

  export type PeminjamanUpdateWithWhereUniqueWithoutBukuInput = {
    where: PeminjamanWhereUniqueInput
    data: XOR<PeminjamanUpdateWithoutBukuInput, PeminjamanUncheckedUpdateWithoutBukuInput>
  }

  export type PeminjamanUpdateManyWithWhereWithoutBukuInput = {
    where: PeminjamanScalarWhereInput
    data: XOR<PeminjamanUpdateManyMutationInput, PeminjamanUncheckedUpdateManyWithoutBukuInput>
  }

  export type RatingUpsertWithWhereUniqueWithoutBukuInput = {
    where: RatingWhereUniqueInput
    update: XOR<RatingUpdateWithoutBukuInput, RatingUncheckedUpdateWithoutBukuInput>
    create: XOR<RatingCreateWithoutBukuInput, RatingUncheckedCreateWithoutBukuInput>
  }

  export type RatingUpdateWithWhereUniqueWithoutBukuInput = {
    where: RatingWhereUniqueInput
    data: XOR<RatingUpdateWithoutBukuInput, RatingUncheckedUpdateWithoutBukuInput>
  }

  export type RatingUpdateManyWithWhereWithoutBukuInput = {
    where: RatingScalarWhereInput
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyWithoutBukuInput>
  }

  export type FavoritUpsertWithWhereUniqueWithoutBukuInput = {
    where: FavoritWhereUniqueInput
    update: XOR<FavoritUpdateWithoutBukuInput, FavoritUncheckedUpdateWithoutBukuInput>
    create: XOR<FavoritCreateWithoutBukuInput, FavoritUncheckedCreateWithoutBukuInput>
  }

  export type FavoritUpdateWithWhereUniqueWithoutBukuInput = {
    where: FavoritWhereUniqueInput
    data: XOR<FavoritUpdateWithoutBukuInput, FavoritUncheckedUpdateWithoutBukuInput>
  }

  export type FavoritUpdateManyWithWhereWithoutBukuInput = {
    where: FavoritScalarWhereInput
    data: XOR<FavoritUpdateManyMutationInput, FavoritUncheckedUpdateManyWithoutBukuInput>
  }

  export type UserCreateWithoutPeminjamanInput = {
    id_user: string
    nama?: string | null
    npm: string
    no_telp?: string | null
    email: string
    password: string
    alamat?: string | null
    jenis_kelamin?: $Enums.JK | null
    role?: $Enums.Role
    created_at?: Date | string
    updated_at?: Date | string
    ratings?: RatingCreateNestedManyWithoutUserInput
    favorit?: FavoritCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPeminjamanInput = {
    id_user: string
    nama?: string | null
    npm: string
    no_telp?: string | null
    email: string
    password: string
    alamat?: string | null
    jenis_kelamin?: $Enums.JK | null
    role?: $Enums.Role
    created_at?: Date | string
    updated_at?: Date | string
    ratings?: RatingUncheckedCreateNestedManyWithoutUserInput
    favorit?: FavoritUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPeminjamanInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPeminjamanInput, UserUncheckedCreateWithoutPeminjamanInput>
  }

  export type BukuCreateWithoutPeminjamanInput = {
    judul: string
    penulis: string
    penerbit: string
    tahun_terbit: number
    isbn: string
    stok: number
    cover_buku: string
    sinopsis: string
    rating_rata: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    kategori: KategoriCreateNestedOneWithoutBukuInput
    ratings?: RatingCreateNestedManyWithoutBukuInput
    favorit?: FavoritCreateNestedManyWithoutBukuInput
  }

  export type BukuUncheckedCreateWithoutPeminjamanInput = {
    id_buku?: number
    id_kategori: number
    judul: string
    penulis: string
    penerbit: string
    tahun_terbit: number
    isbn: string
    stok: number
    cover_buku: string
    sinopsis: string
    rating_rata: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    ratings?: RatingUncheckedCreateNestedManyWithoutBukuInput
    favorit?: FavoritUncheckedCreateNestedManyWithoutBukuInput
  }

  export type BukuCreateOrConnectWithoutPeminjamanInput = {
    where: BukuWhereUniqueInput
    create: XOR<BukuCreateWithoutPeminjamanInput, BukuUncheckedCreateWithoutPeminjamanInput>
  }

  export type DendaCreateWithoutPeminjamanInput = {
    jumlah_denda: Decimal | DecimalJsLike | number | string
    hari_terlambat: number
    keterangan_denda?: $Enums.keteranganDenda
    status_bayar?: $Enums.StatusBayar
    tanggal_bayar?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DendaUncheckedCreateWithoutPeminjamanInput = {
    id_denda?: number
    jumlah_denda: Decimal | DecimalJsLike | number | string
    hari_terlambat: number
    keterangan_denda?: $Enums.keteranganDenda
    status_bayar?: $Enums.StatusBayar
    tanggal_bayar?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DendaCreateOrConnectWithoutPeminjamanInput = {
    where: DendaWhereUniqueInput
    create: XOR<DendaCreateWithoutPeminjamanInput, DendaUncheckedCreateWithoutPeminjamanInput>
  }

  export type UserUpsertWithoutPeminjamanInput = {
    update: XOR<UserUpdateWithoutPeminjamanInput, UserUncheckedUpdateWithoutPeminjamanInput>
    create: XOR<UserCreateWithoutPeminjamanInput, UserUncheckedCreateWithoutPeminjamanInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPeminjamanInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPeminjamanInput, UserUncheckedUpdateWithoutPeminjamanInput>
  }

  export type UserUpdateWithoutPeminjamanInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    npm?: StringFieldUpdateOperationsInput | string
    no_telp?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_kelamin?: NullableEnumJKFieldUpdateOperationsInput | $Enums.JK | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ratings?: RatingUpdateManyWithoutUserNestedInput
    favorit?: FavoritUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPeminjamanInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    npm?: StringFieldUpdateOperationsInput | string
    no_telp?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_kelamin?: NullableEnumJKFieldUpdateOperationsInput | $Enums.JK | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ratings?: RatingUncheckedUpdateManyWithoutUserNestedInput
    favorit?: FavoritUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BukuUpsertWithoutPeminjamanInput = {
    update: XOR<BukuUpdateWithoutPeminjamanInput, BukuUncheckedUpdateWithoutPeminjamanInput>
    create: XOR<BukuCreateWithoutPeminjamanInput, BukuUncheckedCreateWithoutPeminjamanInput>
    where?: BukuWhereInput
  }

  export type BukuUpdateToOneWithWhereWithoutPeminjamanInput = {
    where?: BukuWhereInput
    data: XOR<BukuUpdateWithoutPeminjamanInput, BukuUncheckedUpdateWithoutPeminjamanInput>
  }

  export type BukuUpdateWithoutPeminjamanInput = {
    judul?: StringFieldUpdateOperationsInput | string
    penulis?: StringFieldUpdateOperationsInput | string
    penerbit?: StringFieldUpdateOperationsInput | string
    tahun_terbit?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    stok?: IntFieldUpdateOperationsInput | number
    cover_buku?: StringFieldUpdateOperationsInput | string
    sinopsis?: StringFieldUpdateOperationsInput | string
    rating_rata?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kategori?: KategoriUpdateOneRequiredWithoutBukuNestedInput
    ratings?: RatingUpdateManyWithoutBukuNestedInput
    favorit?: FavoritUpdateManyWithoutBukuNestedInput
  }

  export type BukuUncheckedUpdateWithoutPeminjamanInput = {
    id_buku?: IntFieldUpdateOperationsInput | number
    id_kategori?: IntFieldUpdateOperationsInput | number
    judul?: StringFieldUpdateOperationsInput | string
    penulis?: StringFieldUpdateOperationsInput | string
    penerbit?: StringFieldUpdateOperationsInput | string
    tahun_terbit?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    stok?: IntFieldUpdateOperationsInput | number
    cover_buku?: StringFieldUpdateOperationsInput | string
    sinopsis?: StringFieldUpdateOperationsInput | string
    rating_rata?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ratings?: RatingUncheckedUpdateManyWithoutBukuNestedInput
    favorit?: FavoritUncheckedUpdateManyWithoutBukuNestedInput
  }

  export type DendaUpsertWithoutPeminjamanInput = {
    update: XOR<DendaUpdateWithoutPeminjamanInput, DendaUncheckedUpdateWithoutPeminjamanInput>
    create: XOR<DendaCreateWithoutPeminjamanInput, DendaUncheckedCreateWithoutPeminjamanInput>
    where?: DendaWhereInput
  }

  export type DendaUpdateToOneWithWhereWithoutPeminjamanInput = {
    where?: DendaWhereInput
    data: XOR<DendaUpdateWithoutPeminjamanInput, DendaUncheckedUpdateWithoutPeminjamanInput>
  }

  export type DendaUpdateWithoutPeminjamanInput = {
    jumlah_denda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hari_terlambat?: IntFieldUpdateOperationsInput | number
    keterangan_denda?: EnumketeranganDendaFieldUpdateOperationsInput | $Enums.keteranganDenda
    status_bayar?: EnumStatusBayarFieldUpdateOperationsInput | $Enums.StatusBayar
    tanggal_bayar?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DendaUncheckedUpdateWithoutPeminjamanInput = {
    id_denda?: IntFieldUpdateOperationsInput | number
    jumlah_denda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    hari_terlambat?: IntFieldUpdateOperationsInput | number
    keterangan_denda?: EnumketeranganDendaFieldUpdateOperationsInput | $Enums.keteranganDenda
    status_bayar?: EnumStatusBayarFieldUpdateOperationsInput | $Enums.StatusBayar
    tanggal_bayar?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutRatingsInput = {
    id_user: string
    nama?: string | null
    npm: string
    no_telp?: string | null
    email: string
    password: string
    alamat?: string | null
    jenis_kelamin?: $Enums.JK | null
    role?: $Enums.Role
    created_at?: Date | string
    updated_at?: Date | string
    peminjaman?: PeminjamanCreateNestedManyWithoutUserInput
    favorit?: FavoritCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRatingsInput = {
    id_user: string
    nama?: string | null
    npm: string
    no_telp?: string | null
    email: string
    password: string
    alamat?: string | null
    jenis_kelamin?: $Enums.JK | null
    role?: $Enums.Role
    created_at?: Date | string
    updated_at?: Date | string
    peminjaman?: PeminjamanUncheckedCreateNestedManyWithoutUserInput
    favorit?: FavoritUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRatingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
  }

  export type BukuCreateWithoutRatingsInput = {
    judul: string
    penulis: string
    penerbit: string
    tahun_terbit: number
    isbn: string
    stok: number
    cover_buku: string
    sinopsis: string
    rating_rata: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    kategori: KategoriCreateNestedOneWithoutBukuInput
    peminjaman?: PeminjamanCreateNestedManyWithoutBukuInput
    favorit?: FavoritCreateNestedManyWithoutBukuInput
  }

  export type BukuUncheckedCreateWithoutRatingsInput = {
    id_buku?: number
    id_kategori: number
    judul: string
    penulis: string
    penerbit: string
    tahun_terbit: number
    isbn: string
    stok: number
    cover_buku: string
    sinopsis: string
    rating_rata: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    peminjaman?: PeminjamanUncheckedCreateNestedManyWithoutBukuInput
    favorit?: FavoritUncheckedCreateNestedManyWithoutBukuInput
  }

  export type BukuCreateOrConnectWithoutRatingsInput = {
    where: BukuWhereUniqueInput
    create: XOR<BukuCreateWithoutRatingsInput, BukuUncheckedCreateWithoutRatingsInput>
  }

  export type UserUpsertWithoutRatingsInput = {
    update: XOR<UserUpdateWithoutRatingsInput, UserUncheckedUpdateWithoutRatingsInput>
    create: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRatingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRatingsInput, UserUncheckedUpdateWithoutRatingsInput>
  }

  export type UserUpdateWithoutRatingsInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    npm?: StringFieldUpdateOperationsInput | string
    no_telp?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_kelamin?: NullableEnumJKFieldUpdateOperationsInput | $Enums.JK | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    peminjaman?: PeminjamanUpdateManyWithoutUserNestedInput
    favorit?: FavoritUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRatingsInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    npm?: StringFieldUpdateOperationsInput | string
    no_telp?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_kelamin?: NullableEnumJKFieldUpdateOperationsInput | $Enums.JK | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    peminjaman?: PeminjamanUncheckedUpdateManyWithoutUserNestedInput
    favorit?: FavoritUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BukuUpsertWithoutRatingsInput = {
    update: XOR<BukuUpdateWithoutRatingsInput, BukuUncheckedUpdateWithoutRatingsInput>
    create: XOR<BukuCreateWithoutRatingsInput, BukuUncheckedCreateWithoutRatingsInput>
    where?: BukuWhereInput
  }

  export type BukuUpdateToOneWithWhereWithoutRatingsInput = {
    where?: BukuWhereInput
    data: XOR<BukuUpdateWithoutRatingsInput, BukuUncheckedUpdateWithoutRatingsInput>
  }

  export type BukuUpdateWithoutRatingsInput = {
    judul?: StringFieldUpdateOperationsInput | string
    penulis?: StringFieldUpdateOperationsInput | string
    penerbit?: StringFieldUpdateOperationsInput | string
    tahun_terbit?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    stok?: IntFieldUpdateOperationsInput | number
    cover_buku?: StringFieldUpdateOperationsInput | string
    sinopsis?: StringFieldUpdateOperationsInput | string
    rating_rata?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kategori?: KategoriUpdateOneRequiredWithoutBukuNestedInput
    peminjaman?: PeminjamanUpdateManyWithoutBukuNestedInput
    favorit?: FavoritUpdateManyWithoutBukuNestedInput
  }

  export type BukuUncheckedUpdateWithoutRatingsInput = {
    id_buku?: IntFieldUpdateOperationsInput | number
    id_kategori?: IntFieldUpdateOperationsInput | number
    judul?: StringFieldUpdateOperationsInput | string
    penulis?: StringFieldUpdateOperationsInput | string
    penerbit?: StringFieldUpdateOperationsInput | string
    tahun_terbit?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    stok?: IntFieldUpdateOperationsInput | number
    cover_buku?: StringFieldUpdateOperationsInput | string
    sinopsis?: StringFieldUpdateOperationsInput | string
    rating_rata?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    peminjaman?: PeminjamanUncheckedUpdateManyWithoutBukuNestedInput
    favorit?: FavoritUncheckedUpdateManyWithoutBukuNestedInput
  }

  export type PeminjamanCreateWithoutDendaInput = {
    kode_peminjaman: string
    tanggal_pinjam: Date | string
    tanggal_kembali: Date | string
    tanggal_dikembalikan?: Date | string | null
    status?: $Enums.StatusPeminjaman
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutPeminjamanInput
    buku: BukuCreateNestedOneWithoutPeminjamanInput
  }

  export type PeminjamanUncheckedCreateWithoutDendaInput = {
    id_peminjaman?: number
    id_user: string
    id_buku: number
    kode_peminjaman: string
    tanggal_pinjam: Date | string
    tanggal_kembali: Date | string
    tanggal_dikembalikan?: Date | string | null
    status?: $Enums.StatusPeminjaman
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PeminjamanCreateOrConnectWithoutDendaInput = {
    where: PeminjamanWhereUniqueInput
    create: XOR<PeminjamanCreateWithoutDendaInput, PeminjamanUncheckedCreateWithoutDendaInput>
  }

  export type PeminjamanUpsertWithoutDendaInput = {
    update: XOR<PeminjamanUpdateWithoutDendaInput, PeminjamanUncheckedUpdateWithoutDendaInput>
    create: XOR<PeminjamanCreateWithoutDendaInput, PeminjamanUncheckedCreateWithoutDendaInput>
    where?: PeminjamanWhereInput
  }

  export type PeminjamanUpdateToOneWithWhereWithoutDendaInput = {
    where?: PeminjamanWhereInput
    data: XOR<PeminjamanUpdateWithoutDendaInput, PeminjamanUncheckedUpdateWithoutDendaInput>
  }

  export type PeminjamanUpdateWithoutDendaInput = {
    kode_peminjaman?: StringFieldUpdateOperationsInput | string
    tanggal_pinjam?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_kembali?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_dikembalikan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumStatusPeminjamanFieldUpdateOperationsInput | $Enums.StatusPeminjaman
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPeminjamanNestedInput
    buku?: BukuUpdateOneRequiredWithoutPeminjamanNestedInput
  }

  export type PeminjamanUncheckedUpdateWithoutDendaInput = {
    id_peminjaman?: IntFieldUpdateOperationsInput | number
    id_user?: StringFieldUpdateOperationsInput | string
    id_buku?: IntFieldUpdateOperationsInput | number
    kode_peminjaman?: StringFieldUpdateOperationsInput | string
    tanggal_pinjam?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_kembali?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_dikembalikan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumStatusPeminjamanFieldUpdateOperationsInput | $Enums.StatusPeminjaman
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutFavoritInput = {
    id_user: string
    nama?: string | null
    npm: string
    no_telp?: string | null
    email: string
    password: string
    alamat?: string | null
    jenis_kelamin?: $Enums.JK | null
    role?: $Enums.Role
    created_at?: Date | string
    updated_at?: Date | string
    peminjaman?: PeminjamanCreateNestedManyWithoutUserInput
    ratings?: RatingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoritInput = {
    id_user: string
    nama?: string | null
    npm: string
    no_telp?: string | null
    email: string
    password: string
    alamat?: string | null
    jenis_kelamin?: $Enums.JK | null
    role?: $Enums.Role
    created_at?: Date | string
    updated_at?: Date | string
    peminjaman?: PeminjamanUncheckedCreateNestedManyWithoutUserInput
    ratings?: RatingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoritInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoritInput, UserUncheckedCreateWithoutFavoritInput>
  }

  export type BukuCreateWithoutFavoritInput = {
    judul: string
    penulis: string
    penerbit: string
    tahun_terbit: number
    isbn: string
    stok: number
    cover_buku: string
    sinopsis: string
    rating_rata: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    kategori: KategoriCreateNestedOneWithoutBukuInput
    peminjaman?: PeminjamanCreateNestedManyWithoutBukuInput
    ratings?: RatingCreateNestedManyWithoutBukuInput
  }

  export type BukuUncheckedCreateWithoutFavoritInput = {
    id_buku?: number
    id_kategori: number
    judul: string
    penulis: string
    penerbit: string
    tahun_terbit: number
    isbn: string
    stok: number
    cover_buku: string
    sinopsis: string
    rating_rata: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    peminjaman?: PeminjamanUncheckedCreateNestedManyWithoutBukuInput
    ratings?: RatingUncheckedCreateNestedManyWithoutBukuInput
  }

  export type BukuCreateOrConnectWithoutFavoritInput = {
    where: BukuWhereUniqueInput
    create: XOR<BukuCreateWithoutFavoritInput, BukuUncheckedCreateWithoutFavoritInput>
  }

  export type UserUpsertWithoutFavoritInput = {
    update: XOR<UserUpdateWithoutFavoritInput, UserUncheckedUpdateWithoutFavoritInput>
    create: XOR<UserCreateWithoutFavoritInput, UserUncheckedCreateWithoutFavoritInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavoritInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavoritInput, UserUncheckedUpdateWithoutFavoritInput>
  }

  export type UserUpdateWithoutFavoritInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    npm?: StringFieldUpdateOperationsInput | string
    no_telp?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_kelamin?: NullableEnumJKFieldUpdateOperationsInput | $Enums.JK | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    peminjaman?: PeminjamanUpdateManyWithoutUserNestedInput
    ratings?: RatingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoritInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    nama?: NullableStringFieldUpdateOperationsInput | string | null
    npm?: StringFieldUpdateOperationsInput | string
    no_telp?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_kelamin?: NullableEnumJKFieldUpdateOperationsInput | $Enums.JK | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    peminjaman?: PeminjamanUncheckedUpdateManyWithoutUserNestedInput
    ratings?: RatingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BukuUpsertWithoutFavoritInput = {
    update: XOR<BukuUpdateWithoutFavoritInput, BukuUncheckedUpdateWithoutFavoritInput>
    create: XOR<BukuCreateWithoutFavoritInput, BukuUncheckedCreateWithoutFavoritInput>
    where?: BukuWhereInput
  }

  export type BukuUpdateToOneWithWhereWithoutFavoritInput = {
    where?: BukuWhereInput
    data: XOR<BukuUpdateWithoutFavoritInput, BukuUncheckedUpdateWithoutFavoritInput>
  }

  export type BukuUpdateWithoutFavoritInput = {
    judul?: StringFieldUpdateOperationsInput | string
    penulis?: StringFieldUpdateOperationsInput | string
    penerbit?: StringFieldUpdateOperationsInput | string
    tahun_terbit?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    stok?: IntFieldUpdateOperationsInput | number
    cover_buku?: StringFieldUpdateOperationsInput | string
    sinopsis?: StringFieldUpdateOperationsInput | string
    rating_rata?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kategori?: KategoriUpdateOneRequiredWithoutBukuNestedInput
    peminjaman?: PeminjamanUpdateManyWithoutBukuNestedInput
    ratings?: RatingUpdateManyWithoutBukuNestedInput
  }

  export type BukuUncheckedUpdateWithoutFavoritInput = {
    id_buku?: IntFieldUpdateOperationsInput | number
    id_kategori?: IntFieldUpdateOperationsInput | number
    judul?: StringFieldUpdateOperationsInput | string
    penulis?: StringFieldUpdateOperationsInput | string
    penerbit?: StringFieldUpdateOperationsInput | string
    tahun_terbit?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    stok?: IntFieldUpdateOperationsInput | number
    cover_buku?: StringFieldUpdateOperationsInput | string
    sinopsis?: StringFieldUpdateOperationsInput | string
    rating_rata?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    peminjaman?: PeminjamanUncheckedUpdateManyWithoutBukuNestedInput
    ratings?: RatingUncheckedUpdateManyWithoutBukuNestedInput
  }

  export type PeminjamanCreateManyUserInput = {
    id_peminjaman?: number
    id_buku: number
    kode_peminjaman: string
    tanggal_pinjam: Date | string
    tanggal_kembali: Date | string
    tanggal_dikembalikan?: Date | string | null
    status?: $Enums.StatusPeminjaman
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RatingCreateManyUserInput = {
    id_rating?: number
    id_buku: number
    rating: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FavoritCreateManyUserInput = {
    id_favorit?: number
    id_buku: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PeminjamanUpdateWithoutUserInput = {
    kode_peminjaman?: StringFieldUpdateOperationsInput | string
    tanggal_pinjam?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_kembali?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_dikembalikan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumStatusPeminjamanFieldUpdateOperationsInput | $Enums.StatusPeminjaman
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    buku?: BukuUpdateOneRequiredWithoutPeminjamanNestedInput
    denda?: DendaUpdateOneWithoutPeminjamanNestedInput
  }

  export type PeminjamanUncheckedUpdateWithoutUserInput = {
    id_peminjaman?: IntFieldUpdateOperationsInput | number
    id_buku?: IntFieldUpdateOperationsInput | number
    kode_peminjaman?: StringFieldUpdateOperationsInput | string
    tanggal_pinjam?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_kembali?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_dikembalikan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumStatusPeminjamanFieldUpdateOperationsInput | $Enums.StatusPeminjaman
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    denda?: DendaUncheckedUpdateOneWithoutPeminjamanNestedInput
  }

  export type PeminjamanUncheckedUpdateManyWithoutUserInput = {
    id_peminjaman?: IntFieldUpdateOperationsInput | number
    id_buku?: IntFieldUpdateOperationsInput | number
    kode_peminjaman?: StringFieldUpdateOperationsInput | string
    tanggal_pinjam?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_kembali?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_dikembalikan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumStatusPeminjamanFieldUpdateOperationsInput | $Enums.StatusPeminjaman
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUpdateWithoutUserInput = {
    rating?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    buku?: BukuUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type RatingUncheckedUpdateWithoutUserInput = {
    id_rating?: IntFieldUpdateOperationsInput | number
    id_buku?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyWithoutUserInput = {
    id_rating?: IntFieldUpdateOperationsInput | number
    id_buku?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoritUpdateWithoutUserInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    buku?: BukuUpdateOneRequiredWithoutFavoritNestedInput
  }

  export type FavoritUncheckedUpdateWithoutUserInput = {
    id_favorit?: IntFieldUpdateOperationsInput | number
    id_buku?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoritUncheckedUpdateManyWithoutUserInput = {
    id_favorit?: IntFieldUpdateOperationsInput | number
    id_buku?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BukuCreateManyKategoriInput = {
    id_buku?: number
    judul: string
    penulis: string
    penerbit: string
    tahun_terbit: number
    isbn: string
    stok: number
    cover_buku: string
    sinopsis: string
    rating_rata: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BukuUpdateWithoutKategoriInput = {
    judul?: StringFieldUpdateOperationsInput | string
    penulis?: StringFieldUpdateOperationsInput | string
    penerbit?: StringFieldUpdateOperationsInput | string
    tahun_terbit?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    stok?: IntFieldUpdateOperationsInput | number
    cover_buku?: StringFieldUpdateOperationsInput | string
    sinopsis?: StringFieldUpdateOperationsInput | string
    rating_rata?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    peminjaman?: PeminjamanUpdateManyWithoutBukuNestedInput
    ratings?: RatingUpdateManyWithoutBukuNestedInput
    favorit?: FavoritUpdateManyWithoutBukuNestedInput
  }

  export type BukuUncheckedUpdateWithoutKategoriInput = {
    id_buku?: IntFieldUpdateOperationsInput | number
    judul?: StringFieldUpdateOperationsInput | string
    penulis?: StringFieldUpdateOperationsInput | string
    penerbit?: StringFieldUpdateOperationsInput | string
    tahun_terbit?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    stok?: IntFieldUpdateOperationsInput | number
    cover_buku?: StringFieldUpdateOperationsInput | string
    sinopsis?: StringFieldUpdateOperationsInput | string
    rating_rata?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    peminjaman?: PeminjamanUncheckedUpdateManyWithoutBukuNestedInput
    ratings?: RatingUncheckedUpdateManyWithoutBukuNestedInput
    favorit?: FavoritUncheckedUpdateManyWithoutBukuNestedInput
  }

  export type BukuUncheckedUpdateManyWithoutKategoriInput = {
    id_buku?: IntFieldUpdateOperationsInput | number
    judul?: StringFieldUpdateOperationsInput | string
    penulis?: StringFieldUpdateOperationsInput | string
    penerbit?: StringFieldUpdateOperationsInput | string
    tahun_terbit?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    stok?: IntFieldUpdateOperationsInput | number
    cover_buku?: StringFieldUpdateOperationsInput | string
    sinopsis?: StringFieldUpdateOperationsInput | string
    rating_rata?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeminjamanCreateManyBukuInput = {
    id_peminjaman?: number
    id_user: string
    kode_peminjaman: string
    tanggal_pinjam: Date | string
    tanggal_kembali: Date | string
    tanggal_dikembalikan?: Date | string | null
    status?: $Enums.StatusPeminjaman
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RatingCreateManyBukuInput = {
    id_rating?: number
    id_user: string
    rating: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FavoritCreateManyBukuInput = {
    id_favorit?: number
    id_user: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PeminjamanUpdateWithoutBukuInput = {
    kode_peminjaman?: StringFieldUpdateOperationsInput | string
    tanggal_pinjam?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_kembali?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_dikembalikan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumStatusPeminjamanFieldUpdateOperationsInput | $Enums.StatusPeminjaman
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPeminjamanNestedInput
    denda?: DendaUpdateOneWithoutPeminjamanNestedInput
  }

  export type PeminjamanUncheckedUpdateWithoutBukuInput = {
    id_peminjaman?: IntFieldUpdateOperationsInput | number
    id_user?: StringFieldUpdateOperationsInput | string
    kode_peminjaman?: StringFieldUpdateOperationsInput | string
    tanggal_pinjam?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_kembali?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_dikembalikan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumStatusPeminjamanFieldUpdateOperationsInput | $Enums.StatusPeminjaman
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    denda?: DendaUncheckedUpdateOneWithoutPeminjamanNestedInput
  }

  export type PeminjamanUncheckedUpdateManyWithoutBukuInput = {
    id_peminjaman?: IntFieldUpdateOperationsInput | number
    id_user?: StringFieldUpdateOperationsInput | string
    kode_peminjaman?: StringFieldUpdateOperationsInput | string
    tanggal_pinjam?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_kembali?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_dikembalikan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumStatusPeminjamanFieldUpdateOperationsInput | $Enums.StatusPeminjaman
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUpdateWithoutBukuInput = {
    rating?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type RatingUncheckedUpdateWithoutBukuInput = {
    id_rating?: IntFieldUpdateOperationsInput | number
    id_user?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyWithoutBukuInput = {
    id_rating?: IntFieldUpdateOperationsInput | number
    id_user?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoritUpdateWithoutBukuInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritNestedInput
  }

  export type FavoritUncheckedUpdateWithoutBukuInput = {
    id_favorit?: IntFieldUpdateOperationsInput | number
    id_user?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoritUncheckedUpdateManyWithoutBukuInput = {
    id_favorit?: IntFieldUpdateOperationsInput | number
    id_user?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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