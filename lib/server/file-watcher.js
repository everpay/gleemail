/*
Copyright (c) 2014, Groupon, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.

Neither the name of GROUPON nor the names of its contributors may be
used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Generated by CoffeeScript 2.0.0-beta7
void function () {
  var config, EventEmitter, FileWatcher, fs, instance, templates;
  fs = require('fs');
  EventEmitter = require('events').EventEmitter;
  config = require('./config');
  templates = require('./templates');
  instance = null;
  module.exports = FileWatcher = function (super$) {
    extends$(FileWatcher, super$);
    function FileWatcher() {
      super$.apply(this, arguments);
    }
    FileWatcher.prototype.init = function () {
      return templates.all(function (this$) {
        return function (err, templates) {
          if (err)
            return console.error(err);
          return templates.forEach(function (this$1) {
            return function (template) {
              return this$1.watchTemplate(template.name);
            };
          }(this$));
        };
      }(this));
    };
    FileWatcher.prototype.watchTemplate = function (templateName) {
      var templateDir;
      templateDir = '' + config.root + '/templates/' + templateName;
      return fs.readdir(templateDir, function (this$) {
        return function (err, filenames) {
          if (err)
            return console.error(err);
          return filenames.forEach(function (this$1) {
            return function (filename) {
              var path;
              path = '' + config.root + '/templates/' + templateName + '/' + filename;
              return fs.watchFile(path, {
                persistent: true,
                interval: 500
              }, function (this$2) {
                return function (curr, prev) {
                  if (!(curr.mtime === prev.mtime)) {
                    console.log('Updated', templateName);
                    return this$2.emit('template-updated', { name: templateName });
                  }
                };
              }(this$1));
            };
          }(this$));
        };
      }(this));
    };
    return FileWatcher;
  }(EventEmitter);
  FileWatcher.instance = function () {
    return null != instance ? instance : instance = new FileWatcher;
  };
  function isOwn$(o, p) {
    return {}.hasOwnProperty.call(o, p);
  }
  function extends$(child, parent) {
    for (var key in parent)
      if (isOwn$(parent, key))
        child[key] = parent[key];
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }
}.call(this);
