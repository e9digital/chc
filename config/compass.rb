puts "** loading config/compass.rb **"

root = File.join(File.dirname(__FILE__), '../')
project_path     = root
http_path        = "/"
css_dir          = "#{root}/site/stylesheets"
sass_dir         = "#{root}/src/stylesheets"
output_style     = :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true
