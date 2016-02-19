# Livefyre.js

Livefyre.js is the core library that should be installed on each Livefyre Customer Website. Amongst other things, it provides `Livefyre.require`, which can be used to fetch other Livefyre web components.

## Add to your Site

Note: The recommended installation path is to include a `<script>` tag to a cdn release of [Livefyre/Livefyre-scout](//github.com/Livefyre/Livefyre-scout), which is very tiny and will download the latest version of Livefyre.js for you.

```html
<script src="//cdn.livefyre.com/Livefyre.js"></script>
```

## Modules

### Livefyre.require

#### What it is

Livefyre.require is a custom AMD loader based on [requirejs](http://requirejs.org/). It can be used to load various packages published by Livefyre, and so it presents a convenient and intuitive integration path.

An important feature of Livefyre.require is that its packages are versioned using [Semantic Versioning](http://semver.org/). Packages can be pinned to a version or a range. This gives you, the integrator, flexibility when customizing an integration.

Pinning to a full version guarantees that the Livefyre package code running on the page will not change, while pinning to a major or minor range ensures that you will get new bugfixes and features without having to change the integration code.

* `package-name#1` - Major version pin to v1. You'll get all new updates that maintain a backward-compatible API.
* `package-name#1.1` - Minor version pin to v1.1. You'll get all bugfixes to this minor version, but no additional functionality or changes to default behavior.
* `package-name#1.1.1` - Patch version pin to v1.1.1. The behavior of this embed will never change, even if there are bugfixes.

An example integration using Livefyre.require could look like this:

```html
<!-- First add Livefyre.js to the page -->
<script src="//cdn.livefyre.com/Livefyre.js"></script>

<!-- Then load up all the desired Livefyre packages and Do Stuff in the callback -->
<script>
Livefyre.require([
    'lfawesome#1',
    'lfsuperawesome#2.1.2'
], function (LFAwesome, LFSuperAwesome) {
    var greatness = new LFAwesome();
    // etc..
});
</script>
```

#### Neat Tricks

Livefyre require has some options when loading modules, these are exposed via query params on the current page URL.

`lfmin` If there is an unminified main/index file for the modules, fetch it: `{0|1}`

Caveat, the presence of non-minified files is up to the module author.

{file}.min.js is fetched by default. The non-minified file is expected to be named {file}.js and present in the same directory.

`lfcdn` Choose whether to fetch the cached files or use the originating s3 bucket: `{0|1}`

`lfVersion` Supply a dictionary-like of package version overrides e.g. `?lfVersion[herp]=1.0.0&lfVersion[derp]=2.0.0`. These version values will take precedence.

E.g. www.io.xxx?lfcdn=0&lfmin=0&lfenv=qa will fetch the non-cached, non-minified, qa version of the module.

`lfbucket` It is possible to deploy to different s3 buckets for testing builds, etc: `{dev|qa|uat}` are supported by lfcdn and by this option.

#### Exciting! So what are the available packages and what versions should I use?

The current LF packages are listed here: [packages.html](//cdn.livefyre.com/packages.html)

#### Deploy Process

1) Push a new version of the module to the CDN using [lfcdn](https://github.com/Livefyre/lfcdn), this will place the files at a conventional url so that Livefyre.require can find your module. The main/index file for the module should be specified in the lfpackages.json.

2) Build [executor](http://build.fyre.co/jenkins/job/executor/).

3) Livefyre.require(module#{version})!

```
Livefyre.require(['streamhub-input#v0.2'], function (Input) {
  console.log('Haz Input module: ' + !!Input);
});
```

#### How can I test out pre-release versions of packages?

You may see non-prod versions listed amongst the available packages. New features will be deployed to our UAT testing environment before appearing in production integrations.

Get tomorrow's code today by specifying the a prerelease env rather than a semver version. e.g.:

```
Livefyre.require(['streamhub-input#qa'], cb);
```

Supported envs are `dev`, `qa`, and `uat`.

### auth

The latest version of [Livefyre/livefyre-auth](//github.com/Livefyre/livefyre-auth).

### Coming Soon: Permalinks

Powered by [streamhub-permalink](https://github.com/Joao-S-Martins/streamhub-permalink)

### Cloud Configuration Service (WIP)

There's functionality baked into Livefyre.js to consult the CCS to get configuration goodness. Right now it's
hardcoded to look at a particular place for the domain whitelist, but that will eventually change (hopefully before this stuff is realeased to prod).

#### How it generally works

It works in a two step process (for now, until the real service is stood up):

1. Consult a domain whitelist that lives in an S3 bucket. If the domain name matches one in the whitelist, it will take the URL in said whitelist and fetch that configuration file (which is just a flat file living in S3 right now). The domain white list can be found in this repo under entities/domain-whitelist.json along side the configs that are available as well.

2. Pass the fetched config down to the dependent modules and invoke them so that they can be real things and can configure themselves with the provided config.

#### Tricks

It listens to the query param `ccs` and can be supplied with the following values:

* `disabled`: This will disable the CCS and it will not load any configurations or dependent modules

* A URL: It will only accept URLs that contain 'cdn.livefyre' as part of the URL. This is useful if you want to change which configuration file to load and pass to its dependents. E.g. http://livefyre-cdn-dev.something.com/path/to/config

### Insights Dispatch

Much like a dispatch for a police station, the [Insights Dispatch](https://github.com/Livefyre/insights-dispatch) catches insights events and then sends them off to one or many event sinks.

#### How it generally works

If a configuration is passed to it and the configuration has details for the dispatch to configure itself, Insights Dispatch will be pulled down and instantiated with the provided config.

#### Tricks

It listens to query params `insightsDispatch` and can be supplied with the following values:

* `disabled`: This will disable the loading of the Insights Dispatch module.

* A URL: It will only accept URLs that contain 'cdn.livefyre' as part of the URL. This is useful if you want to change which Insights Dispatch module it should load, but don't have it version-ed yet. E.g. http://livefyre-cdn-dev.something.com/path/to/module

* Version number (e.g. 1.0.0-alpha): It accepts only full and specific semvers with "-TAG" as an option. Therefore, you must provide at least x.x.x, where x are integers, but can also pass a custom tag - e.g. X.X.X-TAG, "1.11.245-alpha".