ROOT = File.join(File.dirname(__FILE__), '/')
puts "Site root: #{ File.expand_path(ROOT) }"

project_path     = ROOT
http_path        = "/"
css_dir          = "site/stylesheets"
sass_dir         = "src/stylesheets"
output_style     = :nested

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true
