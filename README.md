# codeclub_lesson_builder
This project builds codeclub exercises from markdown to styled webpages. A file
watcher builds upon changes and refreshes the browser. Watching is done through
[gulp](//gulpjs.com) and build are done with [metalsmith](//metalsmith.io).

Here is a screenshot with exmaple of workflow:
![](assets/img/workflow.png)

## Development
You will need [node](//nodejs.org) and
[git](//help.github.com/articles/set-up-git/) for using this software.

*codeclub_lesson_builder* should be cloned into a lesson project where markdown
lessons are in a `src` folder. This simplifies setup for contributors, as
*codeclub_lesson_builder* can be included as a git submodule and cloned
recursively. Cloning lesson repo for contributors (instead of this repo with
lessons as submodule) will make pull request to the lesson repo a bit less
complex. The steps below assumes this setup, and are only needed upon first
time inclusion in the lesson repo. Steps for setting up lesson repo with
local building should be similar to this. Look at
[this repo](https://github.com/arve0/example_lessons) for an example of setup.

**Clone repository**
```
git clone https://github.com/arve0/codeclub_lesson_builder
```

**Installing requirements**
```
cd codeclub_lesson_builder
npm install
cp utils/gulp utils/gulp.bat ..
cd ..
```

**Run server *nix**
```
./gulp
```

**Run server windows**
```
gulp.bat
```

### Note Ubuntu users!
nodejs is not installed as *node*, and this causes problems for some packages.
To fix this, link *node* to *nodejs* like so **BEFORE** installing packages
through npm:
```
sudo ln -s /usr/bin/nodejs /usr/local/bin/node
```

### Note - Maximum number of open files
Gulp and metalsmith read files in parallel, which might cause trouble for some
users. If number of open files exceeds operating system limits, one will get
an *EMFILE* error code. Description for increasing number of allowed open files:

- [Linux](http://unix.stackexchange.com/questions/85457/how-to-circumvent-too-many-open-files-in-debian#answers)
- [Mac](http://superuser.com/questions/302754/increase-the-maximum-number-of-open-file-descriptors-in-snow-leopard#answers)
- Windows: Not affected. Report if you're experiencing any trouble.

### Trouble
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/arve0/codeclub_lesson_builder)
Having problems? Come and [chat with us on gitter](https://gitter.im/arve0/codeclub_lesson_builder).


## Specification
You could read about the format in [FORMAT.md](FORMAT.md).

### Features
- [x] Convert markdown to styled HTML
- [ ] Convert markdown to styled PDF
- [x] Create zip-archives of all lessons
- [x] Style scratch code
- [x] Specify your own header and footer in [templates](templates)
- [x] Watch files and re-render lesson upon changes (live-reload in browser)
- [ ] Lesson tags
- [ ] Sortable index with search
- [x] Create playlists and hide lessons from index
- [ ] Support for several languages
- [ ] Use material from other webpages with `external`-tag
