---
title: Gulp Powered Static Site Generator
subtitle: ''
theme: wsmith
style: home
---

Overview
========

Wikismith transforms plain text files into static sites using themes that offer
attractive layouts and front-end aware markdown transformations.

Getting Started
===================

Assuming you have yo and gulp installed.

```
npm install generator-wikismith
```

```
yo wikismith
```

```
gulp
```

Project Structure
===================

Wikismith projects are composed of pages, themes, and a gulpfile.

<pre><code>Project
   |-gulpfile.js
   |-pages
   |---index
   |-wikismith_themes
   |---bespoke
   |---bs3
</code></pre>

Pages
============

Pages are folders containing a plain text file (index.md) and other page assets:

<pre><code>intro_to_gulp
   |-index.md
   |-gulp_graphic.png
   |-grunt_graphic.png
</code></pre>

Index.md is a plain-text file composed of a header and body.  The **header** is a YAML encoded set of variables (known as front-matter) that specify page variables and theme.  The **body** is a Markdown encoded page content that is easy-to-read, and easy-to-write.

####Example

```yaml
---
title: Congratulations!
subtitle: You have successfully setup your Wikismith project.
created: 2014/06/29 16:40 CST
author: Jeffrey R. Hicks
theme: bs3
---

A First Level Header
====================

A Second Level Header
---------------------

Now is the time for all good men to come to
the aid of their country. This is just a
regular paragraph.

The quick brown fox jumped over the lazy
dog's back.

### Header 3

> This is a blockquote.
>
> This is the second paragraph in the blockquote.
```

Themes
=================

Currently Wikiwmith ships with 2 easily customized themes.

* [[Bootstrap 3 Theme]] Live Demo

* [[Bespoke Presentations]] Live Demo

Wikismith themes provide both the front-end build process and markdown rendering. The build process and rendering are respectively framework and templating language agnostic. [[Learn More About Themes]]

Wiki
====

Wikismith provides wiki functionality through **wiki links**.  Wiki links are markdown fragments surrounded by double brackets and trigger wikismith to auto-generate new pages and render links.

Examples:

<pre>

* &#091;&#091;A Cool Page&#093;&#093;

* &#091;&#091;Another Cool Page&#093;&#093;

</pre>

Examples Rendered:

```html
<ul>
<li> <a href='/a_cool_page'>A Cool Page</a>
<li> <a href='/another_cool_page'>Another Cool Page</a>
</ul>

```


Blogging
========

Wikismith provides blogging functionality through **index entries**

Index entries are markdown fragments surrounded in triple brackets that
provide a radically simplified blogging functionality.  Wikismith uses these to auto-generate
new posts and render post previews via [[formatters]].

Examples:

<pre>
&#091;&#091;&#091;Most Recent Entry&#093;&#093;&#093;

&#091;&#091;&#091;Second Blog Entry&#093;&#093;&#093;

&#091;&#091;&#091;First Blog Entry&#093;&#093;&#093;
</pre>

Examples Rendered:

```html
<div class="blog-post">
    <h3 class="blog-post-title">Most Recent Entry</h3>
    <p class="blog-post-meta">2014/08/04 by J. Hicks</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel ante enim ...</p>
    <p><a href="/most_recent_post">Read More</a></p>
</div>

<div class="blog-post">
    <h3 class="blog-post-title">Second Blog Entry</h3>
    <p class="blog-post-meta">2014/08/03 by J. Hicks</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel ante enim ...</p>
    <p><a href="/most_recent_post">Read More</a></p>
</div>

<div class="blog-post">
    <h3 class="blog-post-title">First Blog Entry</h3>
    <p class="blog-post-meta">2014/08/01 by J. Hicks</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel ante enim ...</p>
    <p><a href="/most_recent_post">Read More</a></p>
</div>
```

Presentations
=============

Wikismith can turn pages into presentations by simply changing the theme to **bespoke**.
Below is the markup for an example presentation.

Presentation Markdown

```yaml
---
title: Bespoke Presentations
author: Jeffrey Hicks
theme: bespoke
excerpt: Wikismith integrates Bespoke Presentations
created: "Mon Aug 04 2014 22:25:19 GMT-0500 (CDT)"
---

Bespoke
=======

DIY PRESENTATION micro-framework

Lightweight and Powerful
------------------------

* CSS transitions

* Plugins

* Generators

* Themes

...

```

[[Bespoke Presentations]] - Live Demo

Notable Mentions
========

<blockquote class="twitter-tweet" lang="en"><p>Cool little Gulp based static site generator: <a href="http://t.co/8rZtptTAqX">http://t.co/8rZtptTAqX</a> by <a href="https://twitter.com/jrhicks">@jrhicks</a></p>&mdash; Taylor Otwell - Laravel Founder (@taylorotwell) <a href="https://twitter.com/taylorotwell/statuses/496831540266295296">August 6, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
