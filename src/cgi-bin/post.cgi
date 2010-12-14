#!/usr/local/bin/ruby

require 'cgi'
require 'net/smtp'
require 'date'

require 'rubygems'
require 'mysql2'

cgi = CGI.new

_from = 'contact@creativehumancapital.com'
_to   = 'contact@creativehumancapital.com'

client = Mysql2::Client.new(:host => 'localhost', :username => 'chc_db_user', :password => 'cr34t1v31ty', :database => 'chc')

#email     = client.escape(cgi.params['user_email'].first || '')
#zipcode   = client.escape(cgi.params['user_zipcode'].first || '')
#twitter   = client.escape(cgi.params['user_twitter'].first || '')
#facebook  = client.escape(cgi.params['user_facebook'].first || '')

#client.query(%Q/insert into signups (email, zipcode, twitter, facebook) values ('#{email}', '#{zipcode}', '#{twitter}', '#{facebook}')/)

Net::SMTP.start('localhost', 25) do |smtp|
  message = ''
  smtp.send_message message, _from, _to
end

cgi.out('status' => '200 No Response') { '' }
