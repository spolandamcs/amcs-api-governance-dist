// AMCS REST API Guidelines — Spectral Ruleset
// Version: 0.1.0
// Built: 2026-05-08T15:33:09.965Z
// Source: https://dev.azure.com/amcsgroup/Platform%20Engineering/_git/ApiGovernance
// Canonical guideline doc: https://docs.amcsgroup.io/octo/bok/docs/process-and-standards/api-standards/
//
// This is a bundled distribution file. Do not edit by hand.
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/pluralize/pluralize.js
var require_pluralize = __commonJS({
  "node_modules/pluralize/pluralize.js"(exports, module) {
    (function(root, pluralize2) {
      if (typeof __require === "function" && typeof exports === "object" && typeof module === "object") {
        module.exports = pluralize2();
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return pluralize2();
        });
      } else {
        root.pluralize = pluralize2();
      }
    })(exports, function() {
      var pluralRules = [];
      var singularRules = [];
      var uncountables = {};
      var irregularPlurals = {};
      var irregularSingles = {};
      function sanitizeRule(rule) {
        if (typeof rule === "string") {
          return new RegExp("^" + rule + "$", "i");
        }
        return rule;
      }
      function restoreCase(word, token) {
        if (word === token) return token;
        if (word === word.toLowerCase()) return token.toLowerCase();
        if (word === word.toUpperCase()) return token.toUpperCase();
        if (word[0] === word[0].toUpperCase()) {
          return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
        }
        return token.toLowerCase();
      }
      function interpolate(str, args) {
        return str.replace(/\$(\d{1,2})/g, function(match, index) {
          return args[index] || "";
        });
      }
      function replace(word, rule) {
        return word.replace(rule[0], function(match, index) {
          var result = interpolate(rule[1], arguments);
          if (match === "") {
            return restoreCase(word[index - 1], result);
          }
          return restoreCase(match, result);
        });
      }
      function sanitizeWord(token, word, rules) {
        if (!token.length || uncountables.hasOwnProperty(token)) {
          return word;
        }
        var len = rules.length;
        while (len--) {
          var rule = rules[len];
          if (rule[0].test(word)) return replace(word, rule);
        }
        return word;
      }
      function replaceWord(replaceMap, keepMap, rules) {
        return function(word) {
          var token = word.toLowerCase();
          if (keepMap.hasOwnProperty(token)) {
            return restoreCase(word, token);
          }
          if (replaceMap.hasOwnProperty(token)) {
            return restoreCase(word, replaceMap[token]);
          }
          return sanitizeWord(token, word, rules);
        };
      }
      function checkWord(replaceMap, keepMap, rules, bool) {
        return function(word) {
          var token = word.toLowerCase();
          if (keepMap.hasOwnProperty(token)) return true;
          if (replaceMap.hasOwnProperty(token)) return false;
          return sanitizeWord(token, token, rules) === token;
        };
      }
      function pluralize2(word, count, inclusive) {
        var pluralized = count === 1 ? pluralize2.singular(word) : pluralize2.plural(word);
        return (inclusive ? count + " " : "") + pluralized;
      }
      pluralize2.plural = replaceWord(
        irregularSingles,
        irregularPlurals,
        pluralRules
      );
      pluralize2.isPlural = checkWord(
        irregularSingles,
        irregularPlurals,
        pluralRules
      );
      pluralize2.singular = replaceWord(
        irregularPlurals,
        irregularSingles,
        singularRules
      );
      pluralize2.isSingular = checkWord(
        irregularPlurals,
        irregularSingles,
        singularRules
      );
      pluralize2.addPluralRule = function(rule, replacement) {
        pluralRules.push([sanitizeRule(rule), replacement]);
      };
      pluralize2.addSingularRule = function(rule, replacement) {
        singularRules.push([sanitizeRule(rule), replacement]);
      };
      pluralize2.addUncountableRule = function(word) {
        if (typeof word === "string") {
          uncountables[word.toLowerCase()] = true;
          return;
        }
        pluralize2.addPluralRule(word, "$0");
        pluralize2.addSingularRule(word, "$0");
      };
      pluralize2.addIrregularRule = function(single, plural) {
        plural = plural.toLowerCase();
        single = single.toLowerCase();
        irregularSingles[single] = plural;
        irregularPlurals[plural] = single;
      };
      [
        // Pronouns.
        ["I", "we"],
        ["me", "us"],
        ["he", "they"],
        ["she", "they"],
        ["them", "them"],
        ["myself", "ourselves"],
        ["yourself", "yourselves"],
        ["itself", "themselves"],
        ["herself", "themselves"],
        ["himself", "themselves"],
        ["themself", "themselves"],
        ["is", "are"],
        ["was", "were"],
        ["has", "have"],
        ["this", "these"],
        ["that", "those"],
        // Words ending in with a consonant and `o`.
        ["echo", "echoes"],
        ["dingo", "dingoes"],
        ["volcano", "volcanoes"],
        ["tornado", "tornadoes"],
        ["torpedo", "torpedoes"],
        // Ends with `us`.
        ["genus", "genera"],
        ["viscus", "viscera"],
        // Ends with `ma`.
        ["stigma", "stigmata"],
        ["stoma", "stomata"],
        ["dogma", "dogmata"],
        ["lemma", "lemmata"],
        ["schema", "schemata"],
        ["anathema", "anathemata"],
        // Other irregular rules.
        ["ox", "oxen"],
        ["axe", "axes"],
        ["die", "dice"],
        ["yes", "yeses"],
        ["foot", "feet"],
        ["eave", "eaves"],
        ["goose", "geese"],
        ["tooth", "teeth"],
        ["quiz", "quizzes"],
        ["human", "humans"],
        ["proof", "proofs"],
        ["carve", "carves"],
        ["valve", "valves"],
        ["looey", "looies"],
        ["thief", "thieves"],
        ["groove", "grooves"],
        ["pickaxe", "pickaxes"],
        ["passerby", "passersby"]
      ].forEach(function(rule) {
        return pluralize2.addIrregularRule(rule[0], rule[1]);
      });
      [
        [/s?$/i, "s"],
        [/[^\u0000-\u007F]$/i, "$0"],
        [/([^aeiou]ese)$/i, "$1"],
        [/(ax|test)is$/i, "$1es"],
        [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
        [/(e[mn]u)s?$/i, "$1s"],
        [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
        [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
        [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
        [/(seraph|cherub)(?:im)?$/i, "$1im"],
        [/(her|at|gr)o$/i, "$1oes"],
        [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
        [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
        [/sis$/i, "ses"],
        [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
        [/([^aeiouy]|qu)y$/i, "$1ies"],
        [/([^ch][ieo][ln])ey$/i, "$1ies"],
        [/(x|ch|ss|sh|zz)$/i, "$1es"],
        [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
        [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
        [/(pe)(?:rson|ople)$/i, "$1ople"],
        [/(child)(?:ren)?$/i, "$1ren"],
        [/eaux$/i, "$0"],
        [/m[ae]n$/i, "men"],
        ["thou", "you"]
      ].forEach(function(rule) {
        return pluralize2.addPluralRule(rule[0], rule[1]);
      });
      [
        [/s$/i, ""],
        [/(ss)$/i, "$1"],
        [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, "$1fe"],
        [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
        [/ies$/i, "y"],
        [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, "$1ie"],
        [/\b(mon|smil)ies$/i, "$1ey"],
        [/\b((?:tit)?m|l)ice$/i, "$1ouse"],
        [/(seraph|cherub)im$/i, "$1"],
        [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, "$1"],
        [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, "$1sis"],
        [/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
        [/(test)(?:is|es)$/i, "$1is"],
        [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1us"],
        [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, "$1um"],
        [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, "$1on"],
        [/(alumn|alg|vertebr)ae$/i, "$1a"],
        [/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
        [/(matr|append)ices$/i, "$1ix"],
        [/(pe)(rson|ople)$/i, "$1rson"],
        [/(child)ren$/i, "$1"],
        [/(eau)x?$/i, "$1"],
        [/men$/i, "man"]
      ].forEach(function(rule) {
        return pluralize2.addSingularRule(rule[0], rule[1]);
      });
      [
        // Singular words with no plurals.
        "adulthood",
        "advice",
        "agenda",
        "aid",
        "aircraft",
        "alcohol",
        "ammo",
        "analytics",
        "anime",
        "athletics",
        "audio",
        "bison",
        "blood",
        "bream",
        "buffalo",
        "butter",
        "carp",
        "cash",
        "chassis",
        "chess",
        "clothing",
        "cod",
        "commerce",
        "cooperation",
        "corps",
        "debris",
        "diabetes",
        "digestion",
        "elk",
        "energy",
        "equipment",
        "excretion",
        "expertise",
        "firmware",
        "flounder",
        "fun",
        "gallows",
        "garbage",
        "graffiti",
        "hardware",
        "headquarters",
        "health",
        "herpes",
        "highjinks",
        "homework",
        "housework",
        "information",
        "jeans",
        "justice",
        "kudos",
        "labour",
        "literature",
        "machinery",
        "mackerel",
        "mail",
        "media",
        "mews",
        "moose",
        "music",
        "mud",
        "manga",
        "news",
        "only",
        "personnel",
        "pike",
        "plankton",
        "pliers",
        "police",
        "pollution",
        "premises",
        "rain",
        "research",
        "rice",
        "salmon",
        "scissors",
        "series",
        "sewage",
        "shambles",
        "shrimp",
        "software",
        "species",
        "staff",
        "swine",
        "tennis",
        "traffic",
        "transportation",
        "trout",
        "tuna",
        "wealth",
        "welfare",
        "whiting",
        "wildebeest",
        "wildlife",
        "you",
        /pok[eé]mon$/i,
        // Regexes.
        /[^aeiou]ese$/i,
        // "chinese", "japanese"
        /deer$/i,
        // "deer", "reindeer"
        /fish$/i,
        // "fish", "blowfish", "angelfish"
        /measles$/i,
        /o[iu]s$/i,
        // "carnivorous"
        /pox$/i,
        // "chickpox", "smallpox"
        /sheep$/i
      ].forEach(pluralize2.addUncountableRule);
      return pluralize2;
    });
  }
});

// spectral/amcs-api-guidelines.js
import { pattern, truthy, falsy, schema, casing, enumeration } from "@stoplight/spectral-functions";

// spectral/functions/isPluralCollection.js
var import_pluralize = __toESM(require_pluralize(), 1);
var DEFAULT_SINGLETONS = ["status", "metadata", "health", "me", "current", "info"];
function isPluralCollection(input, options) {
  const opts = options || {};
  const singletons = new Set(opts.singletons || DEFAULT_SINGLETONS);
  if (typeof input !== "string") return [];
  const segments = input.split("/").filter((s) => s.length > 0);
  const issues = [];
  for (let i = 1; i < segments.length; i++) {
    let seg = segments[i];
    const colonIdx = seg.indexOf(":");
    if (colonIdx >= 0) seg = seg.substring(0, colonIdx);
    if (seg.startsWith("{") && seg.endsWith("}")) continue;
    if (singletons.has(seg)) continue;
    if (!import_pluralize.default.isPlural(seg)) {
      issues.push({
        message: `Path segment "${seg}" should be plural \u2014 try "${import_pluralize.default.plural(seg)}". If this is a non-pluralizable singleton, add it to the rule's "singletons" allow-list.`
      });
    }
  }
  return issues;
}

// spectral/functions/pathStructure.js
function pathStructure(input) {
  if (typeof input !== "string") return [];
  const segments = input.split("/").filter((s) => s.length > 0);
  const issues = [];
  for (let i = 2; i < segments.length; i++) {
    const segRaw = segments[i];
    const seg = stripActionSuffix(segRaw);
    if (isParameter(seg)) continue;
    const prev = stripActionSuffix(segments[i - 1]);
    if (!isParameter(prev)) {
      issues.push({
        message: `Path segment "${seg}" at position ${i + 1} must be preceded by a {parameter} segment. Paths follow the pattern prefix / collection / {item} / subcollection / {subitem}; consecutive non-parameter segments are not permitted (sec 1.1, 1.2).`
      });
    }
  }
  return issues;
}
function isParameter(seg) {
  return seg.startsWith("{") && seg.endsWith("}");
}
function stripActionSuffix(seg) {
  const colonIdx = seg.indexOf(":");
  return colonIdx >= 0 ? seg.substring(0, colonIdx) : seg;
}

// spectral/functions/versionParameter.js
function versionParameter(operation, _options, context) {
  if (!operation || typeof operation !== "object") return [];
  if (operation["x-version-neutral"] === true) return [];
  if (Array.isArray(operation.tags) && operation.tags.includes("version-neutral")) {
    return [];
  }
  if (hasApiVersionParam(operation.parameters)) return [];
  const pathItem = resolvePathItem(context);
  if (pathItem) {
    if (pathItem["x-version-neutral"] === true) return [];
    if (hasApiVersionParam(pathItem.parameters)) return [];
  }
  return [
    {
      message: "Operation must declare an `api-version` query or header parameter (at the operation or path-item level), or be marked version-neutral via the `version-neutral` tag or `x-version-neutral: true` extension (sec 6, 6.1)."
    }
  ];
}
function hasApiVersionParam(params) {
  if (!Array.isArray(params)) return false;
  return params.some(
    (p) => p && p.name === "api-version" && (p.in === "query" || p.in === "header")
  );
}
function resolvePathItem(context) {
  if (!context || !context.document || !Array.isArray(context.path)) return null;
  const pathItemKeys = context.path.slice(0, -1);
  let node = context.document.data;
  for (const k of pathItemKeys) {
    if (node == null || typeof node !== "object") return null;
    node = node[k];
  }
  return node && typeof node === "object" ? node : null;
}

// spectral/functions/deprecationHeader.js
function deprecationHeader(operation, options) {
  if (!operation || typeof operation !== "object") return [];
  if (operation.deprecated !== true) return [];
  const headerName = options && options.headerName;
  if (!headerName) return [];
  const responses = operation.responses;
  if (!responses || typeof responses !== "object") return [];
  const issues = [];
  for (const [code, response] of Object.entries(responses)) {
    if (!response || typeof response !== "object") continue;
    const headers = response.headers || {};
    if (!headers[headerName]) {
      issues.push({
        message: `Deprecated operation's ${code} response must declare a ${headerName} response header (sec 11.1).`,
        path: ["responses", code, "headers", headerName]
      });
    }
  }
  return issues;
}

// spectral/amcs-api-guidelines.js
var DEFAULT_SINGLETONS2 = ["status", "metadata", "health", "me", "current", "info"];
var amcs_api_guidelines_default = {
  rules: {
    "amcs-uri-no-version-segment": {
      description: "Paths must not include a version segment such as /v1/ or /v2/. API versioning is expressed via the api-version query parameter or header (sec 6 of the AMCS REST API Guidelines).",
      message: 'Path "{{value}}" includes a version segment. Use the api-version query parameter or header instead.',
      severity: "warn",
      given: ["$.paths.*~"],
      then: {
        function: pattern,
        functionOptions: { notMatch: "/v\\d+(/|$)" }
      }
    },
    "amcs-uri-kebab-case": {
      description: "Path segments must be lowercase letters, digits, and hyphens (kebab-case). Parameter segments like {paramName} are exempt. Action suffixes :action-name are checked by amcs-uri-action-format.",
      message: 'Path "{{value}}" has a segment that is not lowercase + hyphens. Use kebab-case for noun segments (sec 1.1).',
      severity: "warn",
      given: ["$.paths.*~"],
      then: {
        function: pattern,
        functionOptions: { match: "^(/(\\{[^}]+\\}|[a-z][a-z0-9-]*))+(:[\\w-]+)?$" }
      }
    },
    "amcs-uri-nesting-depth": {
      description: "Paths must not nest more than one subcollection deep. Maximum structure: prefix / collection / {item} / subcollection / {subitem}. Action suffixes (:action-name) do not count as additional segments.",
      message: 'Path "{{value}}" nests too deeply (more than one subcollection level). Consider promoting deeply nested resources to a top-level collection (sec 1.2).',
      severity: "warn",
      given: ["$.paths.*~"],
      then: {
        function: pattern,
        functionOptions: { notMatch: "^/[^/]+/[^/]+/[^/]+/[^/]+/[^/]+/[^/]+" }
      }
    },
    "amcs-uri-action-format": {
      description: "Action routes must use the format `resource:action-name` with a kebab-case action name. The colon must follow a resource segment, not the prefix segment (sec 1.3).",
      message: 'Path "{{value}}" has a malformed action route. Format must be `resource:action-name` with a lowercase, hyphen-separated action name (sec 1.3).',
      severity: "warn",
      given: ["$.paths.*~"],
      then: [
        {
          function: pattern,
          functionOptions: { match: "^([^:]*|.*:[a-z]+(-[a-z]+)*)$" }
        },
        {
          function: pattern,
          functionOptions: { notMatch: "^/[^/:]*:" }
        }
      ]
    },
    "amcs-uri-no-query-action-dispatch": {
      description: "Operations must not declare a query parameter whose name suggests action dispatch (e.g., ?action=bulk-import, ?op=approve). Use the colon-action format on the path instead (sec 1.3).",
      message: 'Query parameter "{{value}}" looks like an action dispatcher. Use the resource:action-name format on the path instead (sec 1.3).',
      severity: "warn",
      given: [
        "$.paths[*].parameters[?(@.in == 'query')].name",
        "$.paths[*][*].parameters[?(@.in == 'query')].name"
      ],
      then: {
        function: pattern,
        functionOptions: {
          notMatch: "^(action|Action|op|Op|operation|Operation|command|Command|cmd|Cmd|do|Do|verb|Verb|method|Method)$"
        }
      }
    },
    "amcs-uri-plural-collection": {
      description: "Collection path segments must be plural nouns (sec 1.1). Implementation uses the `pluralize` npm package, which handles irregular plurals (people, mice, children) and uncountables. Allow-list overrides via the `singletons` option.",
      message: "{{error}}",
      severity: "warn",
      given: ["$.paths.*~"],
      then: {
        function: isPluralCollection,
        functionOptions: { singletons: DEFAULT_SINGLETONS2 }
      }
    },
    "amcs-uri-path-structure": {
      description: "Paths must follow the pattern prefix / collection / {item} / subcollection / {subitem}. Every non-{parameter} segment after position 2 must be preceded by a {parameter} segment. No namespace prefixes, no consecutive non-parameter segments. Strict and deterministic \u2014 no allow-list (sec 1.1, 1.2).",
      message: "{{error}}",
      severity: "warn",
      given: ["$.paths.*~"],
      then: {
        function: pathStructure
      }
    },
    // ---------------------------------------------------------------------
    // M3 — HTTP status declarations + response headers + forbidden bodies
    // ---------------------------------------------------------------------
    "amcs-method-post-201-or-202": {
      description: "POST operations should declare a 201 (Created) or 202 (Accepted) response (sec 3.1.201, sec 8.1). 201 for synchronous resource creation; 202 for long-running operations.",
      message: "POST should declare a 201 or 202 response.",
      severity: "warn",
      given: ["$.paths[*].post.responses"],
      then: {
        function: schema,
        functionOptions: {
          schema: {
            anyOf: [{ required: ["201"] }, { required: ["202"] }]
          }
        }
      }
    },
    "amcs-method-delete-204-or-200": {
      description: "DELETE operations should declare a 204 (No Content) or 200 (OK) response (sec 3.1.204). 204 is the canonical case (no body); 200 is allowed when returning information about the deleted resource.",
      message: "DELETE should declare a 204 or 200 response.",
      severity: "warn",
      given: ["$.paths[*].delete.responses"],
      then: {
        function: schema,
        functionOptions: {
          schema: {
            anyOf: [{ required: ["204"] }, { required: ["200"] }]
          }
        }
      }
    },
    "amcs-status-201-location": {
      description: "201 (Created) responses must declare a Location response header pointing at the newly created resource (sec 3.1.201).",
      message: "201 response must declare a Location header.",
      severity: "warn",
      given: ["$.paths[*][*].responses[201]"],
      then: {
        field: "headers.Location",
        function: truthy
      }
    },
    "amcs-status-202-headers": {
      description: "202 (Accepted) responses must declare both Operation-Location and Retry-After response headers so the client can poll for completion (sec 3.1.202, sec 8.1).",
      message: "202 response is missing a required header.",
      severity: "warn",
      given: ["$.paths[*][*].responses[202]"],
      then: [
        { field: "headers.Operation-Location", function: truthy },
        { field: "headers.Retry-After", function: truthy }
      ]
    },
    "amcs-status-204-no-body": {
      description: "204 (No Content) responses must not declare a content map. Per RFC 7230, a 204 response has no body (sec 3.1.204).",
      message: "204 response must not declare a content map.",
      severity: "warn",
      given: ["$.paths[*][*].responses[204]"],
      then: {
        field: "content",
        function: falsy
      }
    },
    "amcs-status-401-no-body": {
      description: "401 (Unauthorized) responses must not declare a content map. The status code is sufficient; a body risks leaking authentication implementation details (sec 3.2.401).",
      message: "401 response must not declare a content map.",
      severity: "warn",
      given: ["$.paths[*][*].responses[401]"],
      then: {
        field: "content",
        function: falsy
      }
    },
    "amcs-status-403-no-body": {
      description: "403 (Forbidden) responses must not declare a content map. Revealing permission details \u2014 even in error messages \u2014 can aid attackers (sec 3.2.403).",
      message: "403 response must not declare a content map.",
      severity: "warn",
      given: ["$.paths[*][*].responses[403]"],
      then: {
        field: "content",
        function: falsy
      }
    },
    "amcs-status-429-retry-after": {
      description: "429 (Too Many Requests) responses must declare a Retry-After response header indicating how many seconds the client should wait (sec 3.2.429).",
      message: "429 response must declare a Retry-After header.",
      severity: "warn",
      given: ["$.paths[*][*].responses[429]"],
      then: {
        field: "headers.Retry-After",
        function: truthy
      }
    },
    "amcs-status-503-retry-after": {
      description: "503 (Service Unavailable) responses should declare a Retry-After response header indicating when the client should retry (sec 3.3.503, SHOULD).",
      message: "503 response should declare a Retry-After header.",
      severity: "info",
      given: ["$.paths[*][*].responses[503]"],
      then: {
        field: "headers.Retry-After",
        function: truthy
      }
    },
    // ---------------------------------------------------------------------
    // M4 — Error response shape (sec 5)
    // ---------------------------------------------------------------------
    "amcs-error-400-validation-problem-details": {
      description: "400 (Bad Request) responses must reference the ValidationProblemDetails schema (sec 5.2). The schema extends ProblemDetails with a field-level `errors` dictionary so clients can identify exactly which fields are invalid.",
      message: "400 response schema must $ref a ValidationProblemDetails-derived schema.",
      severity: "warn",
      // resolved: false keeps $refs intact so we can pattern-match the reference
      // path. With the default (resolved: true), Spectral inlines the referenced
      // schema and `$ref` is no longer present.
      resolved: false,
      given: ["$.paths[*][*].responses[400].content[*].schema"],
      then: {
        field: "$ref",
        function: pattern,
        functionOptions: { match: "/ValidationProblemDetails$" }
      }
    },
    "amcs-error-4xx-problem-details": {
      description: "4xx responses with a body must reference a ProblemDetails-derived schema (sec 5.1). ValidationProblemDetails (used for 400) inherits from ProblemDetails and so satisfies this rule too. 401 and 403 must not declare a body \u2014 see amcs-status-401-no-body and amcs-status-403-no-body.",
      message: "4xx response schema must $ref a ProblemDetails-derived schema.",
      severity: "warn",
      resolved: false,
      given: [
        "$.paths[*][*].responses[?(@property.match(/^4\\d\\d$/))].content[*].schema"
      ],
      then: {
        field: "$ref",
        function: pattern,
        functionOptions: { match: "ProblemDetails$" }
      }
    },
    "amcs-error-5xx-problem-details": {
      description: "5xx responses with a body must reference a ProblemDetails-derived schema (sec 5.1).",
      message: "5xx response schema must $ref a ProblemDetails-derived schema.",
      severity: "warn",
      resolved: false,
      given: [
        "$.paths[*][*].responses[?(@property.match(/^5\\d\\d$/))].content[*].schema"
      ],
      then: {
        field: "$ref",
        function: pattern,
        functionOptions: { match: "ProblemDetails$" }
      }
    },
    "amcs-error-content-type-problem-json": {
      description: "Non-2xx responses with a body must use the application/problem+json content type (sec 5).",
      message: "4xx/5xx responses must use application/problem+json content type.",
      severity: "warn",
      given: [
        "$.paths[*][*].responses[?(@property.match(/^[45]\\d\\d$/))].content"
      ],
      then: {
        function: schema,
        functionOptions: {
          schema: { required: ["application/problem+json"] }
        }
      }
    },
    "amcs-error-problem-details-trace-id": {
      description: "The ProblemDetails schema (in components.schemas) must include a `traceId` property so clients can report the identifier to support and operators can correlate it with server logs (sec 5.1).",
      message: "ProblemDetails schema must include a `traceId` property.",
      severity: "warn",
      given: ["$.components.schemas.ProblemDetails"],
      then: {
        field: "properties.traceId",
        function: truthy
      }
    },
    "amcs-error-validation-problem-details-errors": {
      description: "The ValidationProblemDetails schema (in components.schemas) must include an `errors` property \u2014 the field-level error dictionary keyed by field name with arrays of error messages (sec 5.2).",
      message: "ValidationProblemDetails schema must include an `errors` property.",
      severity: "warn",
      given: ["$.components.schemas.ValidationProblemDetails"],
      then: {
        field: "properties.errors",
        function: truthy
      }
    },
    // ---------------------------------------------------------------------
    // M5 — Schema / JSON conventions + versioning (sec 4, 6, 7)
    // ---------------------------------------------------------------------
    "amcs-schema-camel-case": {
      description: "Schema property names must be camelCase (sec 4.1). Applies to all properties of all schemas under components.schemas.",
      message: 'Schema property "{{property}}" should be camelCase.',
      severity: "warn",
      given: ["$.components.schemas[*].properties"],
      then: {
        field: "@key",
        function: casing,
        functionOptions: { type: "camel" }
      }
    },
    "amcs-schema-enum-string": {
      description: "Enum schemas must use type: string, not integer. Numeric enums are opaque to consumers without an out-of-band schema (sec 4.1).",
      message: "Enum schema must use type: string, not integer.",
      severity: "warn",
      given: ["$..*[?(@property === 'enum' && @ && @.length)]^"],
      then: {
        field: "type",
        function: enumeration,
        functionOptions: { values: ["string"] }
      }
    },
    "amcs-list-envelope-value": {
      description: "GET responses for list endpoints must use the { value: [...] } envelope (sec 7.2), not a top-level array. Heuristic: GET 200 response schemas must not have type: array.",
      message: "GET 200 response schema must not be a top-level array. Use { value: [...] } envelope (sec 7.2).",
      severity: "warn",
      given: ["$.paths[*].get.responses[200].content[*].schema"],
      then: {
        field: "type",
        function: pattern,
        functionOptions: { notMatch: "^array$" }
      }
    },
    "amcs-date-iso-8601": {
      description: "Properties whose names suggest a date or time (ending in At, Date, DateTime, or Time) must use type: string with format: date-time. Unix epoch integers are forbidden (sec 4.4).",
      message: 'Date/time property "{{property}}" must have type: string and format: date-time.',
      severity: "warn",
      given: [
        "$.components.schemas[*].properties[?(@property.match(/(At|Date|DateTime|Time)$/))]"
      ],
      then: [
        { field: "type", function: enumeration, functionOptions: { values: ["string"] } },
        { field: "format", function: enumeration, functionOptions: { values: ["date-time"] } }
      ]
    },
    "amcs-version-parameter": {
      description: "Operations must declare an api-version query or header parameter (sec 6), or be marked version-neutral via either a `version-neutral` tag or `x-version-neutral: true` extension at the operation or path level (sec 6.1).",
      message: "{{error}}",
      severity: "warn",
      given: ["$.paths[*][get,post,put,patch,delete,head,options,trace]"],
      then: {
        function: versionParameter
      }
    },
    // ---------------------------------------------------------------------
    // M6.1 — Deprecation headers (sec 11.1)
    // ---------------------------------------------------------------------
    "amcs-deprecation-header": {
      description: "Deprecated operations must declare a Deprecation response header on every response, indicating when deprecation took effect (sec 11.1).",
      message: "{{error}}",
      severity: "warn",
      given: ["$.paths[*][get,post,put,patch,delete,head,options,trace]"],
      then: {
        function: deprecationHeader,
        functionOptions: { headerName: "Deprecation" }
      }
    },
    "amcs-deprecation-sunset-header": {
      description: "Deprecated operations must declare a Sunset response header indicating when the resource will stop responding (sec 11.1).",
      message: "{{error}}",
      severity: "warn",
      given: ["$.paths[*][get,post,put,patch,delete,head,options,trace]"],
      then: {
        function: deprecationHeader,
        functionOptions: { headerName: "Sunset" }
      }
    },
    "amcs-deprecation-link-header": {
      description: "Deprecated operations must declare a Link response header pointing to deprecation/sunset/successor-version documentation (sec 11.1).",
      message: "{{error}}",
      severity: "warn",
      given: ["$.paths[*][get,post,put,patch,delete,head,options,trace]"],
      then: {
        function: deprecationHeader,
        functionOptions: { headerName: "Link" }
      }
    },
    // ---------------------------------------------------------------------
    // M6.2 — Documentation Completeness (sec 13)
    // All severity: info — informational, not blocking.
    // ---------------------------------------------------------------------
    "amcs-doc-info-description": {
      description: "API spec must populate info.description (sec 13.1).",
      message: "info.description must be a non-empty string.",
      severity: "info",
      given: ["$.info"],
      then: { field: "description", function: truthy }
    },
    "amcs-doc-info-contact": {
      description: "API spec must populate info.contact with a name and at least one of email or url (sec 13.1).",
      message: "info.contact must include a name plus email or url.",
      severity: "info",
      given: ["$.info"],
      then: {
        function: schema,
        functionOptions: {
          schema: {
            required: ["contact"],
            properties: {
              contact: {
                required: ["name"],
                anyOf: [{ required: ["email"] }, { required: ["url"] }]
              }
            }
          }
        }
      }
    },
    "amcs-doc-operation-summary": {
      description: "Every operation must have a non-empty summary (sec 13.2).",
      message: "Operation must have a summary.",
      severity: "info",
      given: ["$.paths[*][get,post,put,patch,delete,head,options,trace]"],
      then: { field: "summary", function: truthy }
    },
    "amcs-doc-operation-description": {
      description: "Every operation must have a non-empty description (sec 13.2). Long-form, separate from summary; sourced from XML <remarks> in ASP.NET Core.",
      message: "Operation must have a description.",
      severity: "info",
      given: ["$.paths[*][get,post,put,patch,delete,head,options,trace]"],
      then: { field: "description", function: truthy }
    },
    "amcs-doc-operation-id": {
      description: "Every operation must have a non-empty operationId. Note: uniqueness across the spec is required but not checked by this rule \u2014 extend the standard spectral:oas ruleset for `operation-operationId-unique` if needed (sec 13.2).",
      message: "Operation must have an operationId.",
      severity: "info",
      given: ["$.paths[*][get,post,put,patch,delete,head,options,trace]"],
      then: { field: "operationId", function: truthy }
    },
    "amcs-doc-operation-tags": {
      description: "Every operation must declare at least one tag (sec 13.2).",
      message: "Operation must declare at least one tag.",
      severity: "info",
      given: ["$.paths[*][get,post,put,patch,delete,head,options,trace]"],
      then: {
        field: "tags",
        function: schema,
        functionOptions: { schema: { type: "array", minItems: 1 } }
      }
    },
    "amcs-doc-parameter-description": {
      description: "Every parameter must have a description explaining its semantics, valid values, and constraints. Applies to operation-, path-, and component-level parameters (sec 13.3).",
      message: "Parameter must have a description.",
      severity: "info",
      given: [
        "$.paths[*][get,post,put,patch,delete,head,options,trace].parameters[*]",
        "$.paths[*].parameters[*]",
        "$.components.parameters[*]"
      ],
      then: { field: "description", function: truthy }
    },
    "amcs-doc-request-body-description": {
      description: "Request bodies must have a description explaining the payload (sec 13.3).",
      message: "requestBody must have a description.",
      severity: "info",
      given: ["$.paths[*][get,post,put,patch,delete,head,options,trace].requestBody"],
      then: { field: "description", function: truthy }
    },
    "amcs-doc-schema-description": {
      description: "Every schema in components.schemas must have a description (sec 13.4). Inline schemas are not covered by this rule.",
      message: "Schema must have a description.",
      severity: "info",
      given: ["$.components.schemas[*]"],
      then: { field: "description", function: truthy }
    },
    "amcs-doc-schema-property-description": {
      description: "Every property in every schema under components.schemas must have a description (sec 13.4). The single most impactful rule for AI agents \u2014 without property descriptions, an agent has no signal for what a field means or what values are sensible.",
      message: "Schema property must have a description.",
      severity: "info",
      given: ["$.components.schemas[*].properties[*]"],
      then: { field: "description", function: truthy }
    },
    "amcs-doc-examples": {
      description: "Every operation's 2xx response with content should include at least one example (either inline `example`, an `examples` map at the media-type level, or `example` on the schema). Examples teach AI agents and human consumers what plausible payloads look like (sec 13.5).",
      message: "2xx response should include an example.",
      severity: "info",
      given: ["$.paths[*][get,post,put,patch,delete,head,options,trace].responses[200,201].content[*]"],
      then: {
        function: schema,
        functionOptions: {
          schema: {
            anyOf: [
              { required: ["example"] },
              { required: ["examples"] },
              { properties: { schema: { required: ["example"] } }, required: ["schema"] }
            ]
          }
        }
      }
    }
  }
};
export {
  amcs_api_guidelines_default as default
};
