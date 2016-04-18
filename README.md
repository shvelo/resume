My Resume
===

An over-engineered project that renders a resume written in Markdown to HTML and PDF

Written in Node.js.  
Requires [wkhtmltopdf](http://wkhtmltopdf.org/) to be installed and in your `PATH`.

## Changing email address

Put [ROT13](http://www.rot13.com/)-encoded email address into `js/insm.js` in `var e = "address here"`

## Building

```shell
# install npm dependencies
npm install
# install gulp
sudo npm install -g gulp

# compile once
gulp
# watch and compile on change
gulp watch
```
