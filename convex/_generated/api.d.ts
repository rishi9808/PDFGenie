/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as exportMap from "../exportMap.js";
import type * as langchain_db from "../langchain/db.js";
import type * as messages from "../messages.js";
import type * as pdf from "../pdf.js";
import type * as pdfAction from "../pdfAction.js";
import type * as pdfStorage from "../pdfStorage.js";
import type * as serve from "../serve.js";
import type * as user from "../user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  exportMap: typeof exportMap;
  "langchain/db": typeof langchain_db;
  messages: typeof messages;
  pdf: typeof pdf;
  pdfAction: typeof pdfAction;
  pdfStorage: typeof pdfStorage;
  serve: typeof serve;
  user: typeof user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
