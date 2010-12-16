ssh_user = "ubuntu@creativehumancapital.com"
remote_root = "/srv/apps/creativehumancapital.com/site"

desc "Runs preview"
task :preview do
  system "staticmatic preview ."
end

desc "Build the site"
task :build => ["styles:clear", "javascripts:generate"] do
  puts "** building site **"
  system "staticmatic build ."
end

desc "Clear and generate new styles, build, and deploy"
task :deploy => :build do
  puts "** deploying site **"
  #system "rsync -avz --delete site/ /var/www"
  system("rsync -avz --rsh \"ssh -i /home/travis/.ec2/gsg-keypair.pem\" --delete site/ #{ssh_user}:#{remote_root}")
end

namespace :javascripts do
  desc "Clear javascripts"
  task :clear do
    puts "** clearing javascripts **"
    system "rm -Rfv site/javascripts/*"
  end

  desc "Generate javascripts"
  task :generate => :clear do
    puts "** generating javascripts **"
    system "jammit -c config/assets.yml -o site/javascripts -f"
  end
end

namespace :styles do
  desc "Clear styles"
  task :clear do
    puts "** clearing styles **"
    system "rm -Rfv site/stylesheets/*"
  end

  desc "Regenerate styles"
  task :generate => :clear do
    puts "** generating styles **" 
    system "compass compile -c config/compass.rb"
  end
end
