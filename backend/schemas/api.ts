// tslint:disable
/**
 * Sample API specification
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as globalImportUrl from 'url';
import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from './base';

/**
 * ドキュメント
 * @export
 * @interface Document
 */
export interface Document {
  /**
   * ドキュメントID
   * @type {string}
   * @memberof Document
   */
  id: string;
  /**
   * ユーザーID
   * @type {string}
   * @memberof Document
   */
  userId: string;
  /**
   * 英文
   * @type {string}
   * @memberof Document
   */
  sentence: string;
  /**
   * 訳
   * @type {string}
   * @memberof Document
   */
  translation: string;
  /**
   * 作成日
   * @type {string}
   * @memberof Document
   */
  createdAt: string;
  /**
   * 更新日
   * @type {string}
   * @memberof Document
   */
  updatedAt: string;
  /**
   *
   * @type {Array<Mark>}
   * @memberof Document
   */
  marks: Array<Mark>;
}
/**
 *
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
  /**
   * ステータスコード
   * @type {number}
   * @memberof ErrorResponse
   */
  status?: number;
  /**
   * エラーメッセージ
   * @type {string}
   * @memberof ErrorResponse
   */
  message?: string;
}
/**
 * ログインAPIリクエストボディ
 * @export
 * @interface LoginRequestBody
 */
export interface LoginRequestBody {
  /**
   * ID
   * @type {string}
   * @memberof LoginRequestBody
   */
  id: string;
  /**
   * パスワード
   * @type {string}
   * @memberof LoginRequestBody
   */
  password: string;
}
/**
 * 単語に付与されたマーク
 * @export
 * @interface Mark
 */
export interface Mark {
  /**
   * マークが付与されているインデックス
   * @type {number}
   * @memberof Mark
   */
  index: number;
  /**
   * マークの種別
   * @type {string}
   * @memberof Mark
   */
  type: string;
}
/**
 * 新規登録APIリクエストボディ
 * @export
 * @interface RegisterRequestBody
 */
export interface RegisterRequestBody {
  /**
   * ID
   * @type {string}
   * @memberof RegisterRequestBody
   */
  id: string;
  /**
   * パスワード
   * @type {string}
   * @memberof RegisterRequestBody
   */
  password: string;
}
/**
 * 翻訳APIリクエストボディ
 * @export
 * @interface TranslateRequestBody
 */
export interface TranslateRequestBody {
  /**
   * 原文
   * @type {string}
   * @memberof TranslateRequestBody
   */
  text: string;
  /**
   * 翻訳する言語
   * @type {string}
   * @memberof TranslateRequestBody
   */
  targetLang: string;
}

/**
 * DocumentApi - axios parameter creator
 * @export
 */
export const DocumentApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     * ドキュメント新規作成API
     * @param {string} userId ユーザーID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createDocument(userId: string, options: any = {}): RequestArgs {
      // verify required parameter 'userId' is not null or undefined
      if (userId === null || userId === undefined) {
        throw new RequiredError(
          'userId',
          'Required parameter userId was null or undefined when calling createDocument.',
        );
      }
      const localVarPath = `/document`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (userId !== undefined) {
        localVarQueryParameter['userId'] = userId;
      }

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...options.headers,
      };

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * ドキュメント取得API
     * @param {string} userId ユーザーID
     * @param {string} documentId ドキュメントID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDocument(
      userId: string,
      documentId: string,
      options: any = {},
    ): RequestArgs {
      // verify required parameter 'userId' is not null or undefined
      if (userId === null || userId === undefined) {
        throw new RequiredError(
          'userId',
          'Required parameter userId was null or undefined when calling getDocument.',
        );
      }
      // verify required parameter 'documentId' is not null or undefined
      if (documentId === null || documentId === undefined) {
        throw new RequiredError(
          'documentId',
          'Required parameter documentId was null or undefined when calling getDocument.',
        );
      }
      const localVarPath = `/document`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (userId !== undefined) {
        localVarQueryParameter['userId'] = userId;
      }

      if (documentId !== undefined) {
        localVarQueryParameter['documentId'] = documentId;
      }

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...options.headers,
      };

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * ドキュメント一覧取得API
     * @param {string} userId ユーザーID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDocuments(userId: string, options: any = {}): RequestArgs {
      // verify required parameter 'userId' is not null or undefined
      if (userId === null || userId === undefined) {
        throw new RequiredError(
          'userId',
          'Required parameter userId was null or undefined when calling getDocuments.',
        );
      }
      const localVarPath = `/documents`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (userId !== undefined) {
        localVarQueryParameter['userId'] = userId;
      }

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...options.headers,
      };

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * ドキュメント更新API
     * @param {Document} document 更新するドキュメントの内容
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateDocument(document: Document, options: any = {}): RequestArgs {
      // verify required parameter 'document' is not null or undefined
      if (document === null || document === undefined) {
        throw new RequiredError(
          'document',
          'Required parameter document was null or undefined when calling updateDocument.',
        );
      }
      const localVarPath = `/document`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: 'PUT',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...options.headers,
      };
      const needsSerialization =
        typeof document !== 'string' ||
        localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(document !== undefined ? document : {})
        : document || '';

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * DocumentApi - functional programming interface
 * @export
 */
export const DocumentApiFp = function (configuration?: Configuration) {
  return {
    /**
     * ドキュメント新規作成API
     * @param {string} userId ユーザーID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createDocument(
      userId: string,
      options?: any,
    ): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Document> {
      const localVarAxiosArgs = DocumentApiAxiosParamCreator(
        configuration,
      ).createDocument(userId, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * ドキュメント取得API
     * @param {string} userId ユーザーID
     * @param {string} documentId ドキュメントID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDocument(
      userId: string,
      documentId: string,
      options?: any,
    ): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Document> {
      const localVarAxiosArgs = DocumentApiAxiosParamCreator(
        configuration,
      ).getDocument(userId, documentId, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * ドキュメント一覧取得API
     * @param {string} userId ユーザーID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDocuments(
      userId: string,
      options?: any,
    ): (
      axios?: AxiosInstance,
      basePath?: string,
    ) => AxiosPromise<Array<Document>> {
      const localVarAxiosArgs = DocumentApiAxiosParamCreator(
        configuration,
      ).getDocuments(userId, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * ドキュメント更新API
     * @param {Document} document 更新するドキュメントの内容
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateDocument(
      document: Document,
      options?: any,
    ): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<boolean> {
      const localVarAxiosArgs = DocumentApiAxiosParamCreator(
        configuration,
      ).updateDocument(document, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * DocumentApi - factory interface
 * @export
 */
export const DocumentApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  return {
    /**
     * ドキュメント新規作成API
     * @param {string} userId ユーザーID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createDocument(userId: string, options?: any) {
      return DocumentApiFp(configuration).createDocument(userId, options)(
        axios,
        basePath,
      );
    },
    /**
     * ドキュメント取得API
     * @param {string} userId ユーザーID
     * @param {string} documentId ドキュメントID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDocument(userId: string, documentId: string, options?: any) {
      return DocumentApiFp(configuration).getDocument(
        userId,
        documentId,
        options,
      )(axios, basePath);
    },
    /**
     * ドキュメント一覧取得API
     * @param {string} userId ユーザーID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDocuments(userId: string, options?: any) {
      return DocumentApiFp(configuration).getDocuments(userId, options)(
        axios,
        basePath,
      );
    },
    /**
     * ドキュメント更新API
     * @param {Document} document 更新するドキュメントの内容
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateDocument(document: Document, options?: any) {
      return DocumentApiFp(configuration).updateDocument(document, options)(
        axios,
        basePath,
      );
    },
  };
};

/**
 * DocumentApi - object-oriented interface
 * @export
 * @class DocumentApi
 * @extends {BaseAPI}
 */
export class DocumentApi extends BaseAPI {
  /**
   * ドキュメント新規作成API
   * @param {string} userId ユーザーID
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DocumentApi
   */
  public createDocument(userId: string, options?: any) {
    return DocumentApiFp(this.configuration).createDocument(userId, options)(
      this.axios,
      this.basePath,
    );
  }

  /**
   * ドキュメント取得API
   * @param {string} userId ユーザーID
   * @param {string} documentId ドキュメントID
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DocumentApi
   */
  public getDocument(userId: string, documentId: string, options?: any) {
    return DocumentApiFp(this.configuration).getDocument(
      userId,
      documentId,
      options,
    )(this.axios, this.basePath);
  }

  /**
   * ドキュメント一覧取得API
   * @param {string} userId ユーザーID
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DocumentApi
   */
  public getDocuments(userId: string, options?: any) {
    return DocumentApiFp(this.configuration).getDocuments(userId, options)(
      this.axios,
      this.basePath,
    );
  }

  /**
   * ドキュメント更新API
   * @param {Document} document 更新するドキュメントの内容
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DocumentApi
   */
  public updateDocument(document: Document, options?: any) {
    return DocumentApiFp(this.configuration).updateDocument(document, options)(
      this.axios,
      this.basePath,
    );
  }
}

/**
 * LoginApi - axios parameter creator
 * @export
 */
export const LoginApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     * ログインAPI
     * @param {LoginRequestBody} loginRequestBody ログインAPIリクエストボディ
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    login(loginRequestBody: LoginRequestBody, options: any = {}): RequestArgs {
      // verify required parameter 'loginRequestBody' is not null or undefined
      if (loginRequestBody === null || loginRequestBody === undefined) {
        throw new RequiredError(
          'loginRequestBody',
          'Required parameter loginRequestBody was null or undefined when calling login.',
        );
      }
      const localVarPath = `/login`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...options.headers,
      };
      const needsSerialization =
        typeof loginRequestBody !== 'string' ||
        localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(loginRequestBody !== undefined ? loginRequestBody : {})
        : loginRequestBody || '';

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * LoginApi - functional programming interface
 * @export
 */
export const LoginApiFp = function (configuration?: Configuration) {
  return {
    /**
     * ログインAPI
     * @param {LoginRequestBody} loginRequestBody ログインAPIリクエストボディ
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    login(
      loginRequestBody: LoginRequestBody,
      options?: any,
    ): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<string> {
      const localVarAxiosArgs = LoginApiAxiosParamCreator(configuration).login(
        loginRequestBody,
        options,
      );
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * LoginApi - factory interface
 * @export
 */
export const LoginApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  return {
    /**
     * ログインAPI
     * @param {LoginRequestBody} loginRequestBody ログインAPIリクエストボディ
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    login(loginRequestBody: LoginRequestBody, options?: any) {
      return LoginApiFp(configuration).login(loginRequestBody, options)(
        axios,
        basePath,
      );
    },
  };
};

/**
 * LoginApi - object-oriented interface
 * @export
 * @class LoginApi
 * @extends {BaseAPI}
 */
export class LoginApi extends BaseAPI {
  /**
   * ログインAPI
   * @param {LoginRequestBody} loginRequestBody ログインAPIリクエストボディ
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LoginApi
   */
  public login(loginRequestBody: LoginRequestBody, options?: any) {
    return LoginApiFp(this.configuration).login(loginRequestBody, options)(
      this.axios,
      this.basePath,
    );
  }
}

/**
 * RegisterApi - axios parameter creator
 * @export
 */
export const RegisterApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     * 新規登録API
     * @param {RegisterRequestBody} registerRequestBody 新規登録APIリクエストボディ
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    register(
      registerRequestBody: RegisterRequestBody,
      options: any = {},
    ): RequestArgs {
      // verify required parameter 'registerRequestBody' is not null or undefined
      if (registerRequestBody === null || registerRequestBody === undefined) {
        throw new RequiredError(
          'registerRequestBody',
          'Required parameter registerRequestBody was null or undefined when calling register.',
        );
      }
      const localVarPath = `/register`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...options.headers,
      };
      const needsSerialization =
        typeof registerRequestBody !== 'string' ||
        localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(
            registerRequestBody !== undefined ? registerRequestBody : {},
          )
        : registerRequestBody || '';

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * RegisterApi - functional programming interface
 * @export
 */
export const RegisterApiFp = function (configuration?: Configuration) {
  return {
    /**
     * 新規登録API
     * @param {RegisterRequestBody} registerRequestBody 新規登録APIリクエストボディ
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    register(
      registerRequestBody: RegisterRequestBody,
      options?: any,
    ): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<string> {
      const localVarAxiosArgs = RegisterApiAxiosParamCreator(
        configuration,
      ).register(registerRequestBody, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * RegisterApi - factory interface
 * @export
 */
export const RegisterApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  return {
    /**
     * 新規登録API
     * @param {RegisterRequestBody} registerRequestBody 新規登録APIリクエストボディ
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    register(registerRequestBody: RegisterRequestBody, options?: any) {
      return RegisterApiFp(configuration).register(
        registerRequestBody,
        options,
      )(axios, basePath);
    },
  };
};

/**
 * RegisterApi - object-oriented interface
 * @export
 * @class RegisterApi
 * @extends {BaseAPI}
 */
export class RegisterApi extends BaseAPI {
  /**
   * 新規登録API
   * @param {RegisterRequestBody} registerRequestBody 新規登録APIリクエストボディ
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RegisterApi
   */
  public register(registerRequestBody: RegisterRequestBody, options?: any) {
    return RegisterApiFp(this.configuration).register(
      registerRequestBody,
      options,
    )(this.axios, this.basePath);
  }
}

/**
 * TranslationApi - axios parameter creator
 * @export
 */
export const TranslationApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     * 翻訳結果取得API
     * @param {TranslateRequestBody} translateRequestBody 翻訳APIリクエストボディ
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    translate(
      translateRequestBody: TranslateRequestBody,
      options: any = {},
    ): RequestArgs {
      // verify required parameter 'translateRequestBody' is not null or undefined
      if (translateRequestBody === null || translateRequestBody === undefined) {
        throw new RequiredError(
          'translateRequestBody',
          'Required parameter translateRequestBody was null or undefined when calling translate.',
        );
      }
      const localVarPath = `/translation`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...options.headers,
      };
      const needsSerialization =
        typeof translateRequestBody !== 'string' ||
        localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(
            translateRequestBody !== undefined ? translateRequestBody : {},
          )
        : translateRequestBody || '';

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * TranslationApi - functional programming interface
 * @export
 */
export const TranslationApiFp = function (configuration?: Configuration) {
  return {
    /**
     * 翻訳結果取得API
     * @param {TranslateRequestBody} translateRequestBody 翻訳APIリクエストボディ
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    translate(
      translateRequestBody: TranslateRequestBody,
      options?: any,
    ): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<string> {
      const localVarAxiosArgs = TranslationApiAxiosParamCreator(
        configuration,
      ).translate(translateRequestBody, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * TranslationApi - factory interface
 * @export
 */
export const TranslationApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  return {
    /**
     * 翻訳結果取得API
     * @param {TranslateRequestBody} translateRequestBody 翻訳APIリクエストボディ
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    translate(translateRequestBody: TranslateRequestBody, options?: any) {
      return TranslationApiFp(configuration).translate(
        translateRequestBody,
        options,
      )(axios, basePath);
    },
  };
};

/**
 * TranslationApi - object-oriented interface
 * @export
 * @class TranslationApi
 * @extends {BaseAPI}
 */
export class TranslationApi extends BaseAPI {
  /**
   * 翻訳結果取得API
   * @param {TranslateRequestBody} translateRequestBody 翻訳APIリクエストボディ
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TranslationApi
   */
  public translate(translateRequestBody: TranslateRequestBody, options?: any) {
    return TranslationApiFp(this.configuration).translate(
      translateRequestBody,
      options,
    )(this.axios, this.basePath);
  }
}
