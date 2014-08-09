---
title: Adding Posts With Index Entries
subtitle: ''
author: 'Jeffrey Hicks'
theme: wsmith
excerpt: Index entries are the markdown fragments surrounded in triple brackets that provide the radically simplified blogging functionality in wikismith. Wikismith uses them to auto-generate new posts and render a post preview that includes post title, meta information, excerpt, and permalink.
created: "Sun Aug 03 2014 13:19:50 GMT-0500 (CDT)"
---

# Index Entries

Index entries are markdown fragments surrounded in triple brackets that
provide a radically simplified blogging functionality.  Wikismith uses these to auto-generate
new posts and render post previews
that include titles, meta data, excerpts, and permalinks.

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

#Formatters

Wikismith formats **index entries** via formatters.  Below is the default formatter for index_entries.

#### formatters/index_entry.html
```ejs
<div class="blog-post">
    <h3 class="blog-post-title"><%=params.title%></h3>
    <p class="blog-post-meta"><%=params.created%> by <%=params.author%></p>
    <p><%=params.excerpt%></p>
    <p><a href="<%=url%>">Read More</a></p>
</div>
```

#### formatters/index.js
```javascript
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

function index_entry(file) {
    var template = String(fs.readFileSync(path.join(__dirname, 'page_snippet.html')));

    return ejs.render(template, {
        url: file.url,
        params: file.params
    });
}

module.exports = {
    page_snippet: page_snippet
}
```



# Roadmap

In version 0.5, Wikismith will check the theme for overrides to default index_entry formatters.
