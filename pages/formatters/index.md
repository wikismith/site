---
title: formatters
subtitle: ""
theme: wsmith
style: home
created: "Tue Aug 05 2014 22:01:47 GMT-0500 (CDT)"
---

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
