// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
// DOM initialization
//theme
var darkTheme = document.querySelector(".dark-theme");
var lightTheme = document.querySelector(".light-theme"); // form

var searchForm = document.querySelector(".search");
var searchInput = document.querySelector(".search input");
var btn = document.querySelector(".search button"); // profile data

var profilePicture = document.querySelector("aside .profile-picture");
var userHeading = document.querySelector("article header .heading");
var userName = document.querySelector("article header .user-name a");
var joinDate = document.querySelector("article header .join-date time");
var bio = document.querySelector(".bio");
var repos = document.querySelector("table tbody td:nth-of-type(1)");
var followers = document.querySelector("table tbody td:nth-of-type(2)");
var following = document.querySelector("table tbody td:nth-of-type(3)");
var location = document.querySelector(".location h4");
var website = document.querySelector(".website h4 a");
var twitter = document.querySelector(".twitter h4 a");
var company = document.querySelector(".company h4 a"); //Endpoint's URL

var userEndpoint = new URL("https://api.github.com/users/"); // function to populate the search results

function publicResult(res) {
  // profile picture
  profilePicture.src = res.avatar_url; // name

  userHeading.innerText = res.name ? res.name : res.login; // username

  userName.innerText = "@" + res.login; // joined Date

  var date = new Date(res.created_at); //formatting date's string

  var dateString = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long"
  }).format(date);
  joinDate.innerText = dateString; //updating datetime attribute

  joinDate.setAttribute("datetime", res.created_at); //bio

  bio.innerText = res.bio;
  bio.removeAttribute("style");

  if (!res.bio) {
    bio.innerText = "This profile has no bio";
    bio.style.opacity = 0.5;
  } // Repos | followers | following


  repos.innerText = res.public_repos;
  followers.innerText = res.followers;
  following.innerText = res.following; // location | website | twitter | company
  // location

  location.innerText = res.location;
  location.parentElement.removeAttribute("style");

  if (!res.location) {
    location.innerText = "Not available";
    location.parentElement.style.opacity = 0.5;
  } // website


  website.innerText = res.html_url;
  website.href = res.html_url;
  website.removeAttribute("class");
  website.removeAttribute("style");
  website.parentElement.parentElement.removeAttribute("style");

  if (!res.html_url) {
    website.innerText = "Not available";
    website.parentElement.parentElement.style.opacity = 0.5;
    website.href = "javaScript: void(0)";
    website.className = "disable-link-hover";
    website.style.pointerEvents = "none";
  } // twitter


  twitter.innerText = res.twitter_username;
  twitter.href = "https://twitter.com/" + res.twitter_username;
  twitter.removeAttribute("class");
  twitter.removeAttribute("style");
  twitter.parentElement.parentElement.removeAttribute("style");

  if (!res.twitter_username) {
    twitter.innerText = "Not available";
    twitter.parentElement.parentElement.style.opacity = 0.5;
    twitter.href = "javaScript: void(0)";
    twitter.className = "disable-link-hover";
    twitter.style.pointerEvents = "none";
  } // company


  if (!res.company) {
    company.innerText = "Not available";
    company.parentElement.parentElement.style.opacity = 0.5;
    company.href = "javaScript: void(0)";
    company.className = "disable-link-hover";
    company.style.pointerEvents = "none";
  } else {
    company.innerText = res.company.slice(0, 1) === "@" ? res.company.slice(1) : res.company;
    company.href = res.login === "octocat" ? "https://github.com/" : "https://github.com/" + company.innerText;
    company.removeAttribute("class");
    company.removeAttribute("style");
    company.parentElement.parentElement.removeAttribute("style");
  }
}

function getUser(username) {
  var userDataUrl = userEndpoint.href + username;
  fetch(userDataUrl).then(function (response) {
    if (!response.ok) {
      if (response.status == 404) {
        throw new Error("No results");
      } else {
        throw new Error("Network response was not OK");
      }
    }

    return response.json();
  }).then(function (response) {
    publicResult(response);
  }).catch(function (error) {
    console.error("There has been a problem with the fetch operation", error);
    searchInput.value = error.message;
    searchInput.style.color = "red";
    searchInput.style.textAlign = "right";

    if (error.message != "No results") {
      searchInput.value = "Network problems";
    }
  });
} // Events
// On first load


window.onload = function () {
  getUser("octocat");
  searchInput.value = "";
}; // Pressing Search button


btn.addEventListener("click", function () {
  var inputValue = searchInput.value;
  getUser(inputValue);
  searchInput.value = "";
}); // Clicking the input box

searchInput.addEventListener("click", function () {
  searchInput.value = "";
  searchInput.style.color = null;
  searchInput.style.textAlign = null; // searchInput.removeAttribute("style");
}); // Switch between light and dark themes
// Dark theme

darkTheme.addEventListener("click", function (event) {
  var theme = event.currentTarget;
  theme.style.display = "none";
  lightTheme.style.display = "flex"; // BACKGROUNDS
  // body and table background

  document.querySelectorAll("body, table").forEach(function (item) {
    return item.style.backgroundColor = "#141d2f";
  }); // nav, input and main background

  document.querySelectorAll("nav input, main").forEach(function (item) {
    item.style.backgroundColor = "#1e2a47";
    item.style.boxShadow = "none";
  }); // Text color
  // tbod

  document.querySelector("body").style.color = "#ffffff";
  document.querySelectorAll("h1, article header h3, table tbody td").forEach(function (item) {
    item.style.color = document.querySelector("body").style.color;
  });
  console.log(document.querySelectorAll("h1, article header h3, table tbody td"));
}); // light Theme

lightTheme.addEventListener("click", function (event) {
  var theme = event.currentTarget;
  theme.style.display = "none";
  darkTheme.style.display = "flex"; // BACKGROUNDS
  // body and table background

  document.querySelectorAll("body, table").forEach(function (item) {
    item.style.backgroundColor = "#f6f8ff";
  }); // nav, input and main background

  document.querySelectorAll("nav input, main").forEach(function (item) {
    item.style.backgroundColor = "#fefefe";
    item.style.boxShadow = "0px 16px 30px rgba(70, 96, 187, 0.1986";
  }); // Text color
  // tbod

  document.querySelector("body").style.color = "#4b6a9b";
  document.querySelectorAll("h1, article header h3, table tbody td").forEach(function (item) {
    item.style.color = "#222731";
  });
}); // Hover

if (matchMedia("(pointer:fine)").matches) {
  // Dark theme :hover
  darkTheme.addEventListener("mouseover", function (event) {
    event.currentTarget.style.color = "#222731";
  });
  darkTheme.addEventListener("mouseleave", function (event) {
    event.currentTarget.style.color = document.querySelector("body").style.color;
  }); // Light theme :hover

  lightTheme.addEventListener("mouseover", function (event) {
    event.currentTarget.style.color = "#90a4d4";
  });
  lightTheme.addEventListener("mouseleave", function (event) {
    event.currentTarget.style.color = document.querySelector("body").style.color;
  });
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50008" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map