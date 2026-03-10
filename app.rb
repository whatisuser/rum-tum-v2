require 'sinatra'
require 'sqlite3'

set :public_folder, 'public'

get '/' do
    redirect '/splash-page.html'
end

get '/index' do
    redirect '/index.html'
end
get '/registration' do
    redirect 'registration-form.html'
end 

get '/login' do
    redirect '/login.html'
end

post '/login' do
    db = SQLite3::Database.open('rumtum.db')
    query = 'select * from users where email = "' + params[:email] + '" and password = "' + params[:password] + '"'
    puts query
    result = db.execute(query)
    puts result
    if result.length == 0
        redirect '/login.html'
    else
        redirect '/restaurant-mapper.html'
    end
end
get '/mapper' do
    redirect '/restaurant-mapper.html'
end

get '/register' do
    redirect '/registration-form.html'
end

post '/register' do
    begin
    db = SQLite3::Database.open('rumtum.db')
    puts params[:email]
    puts params[:username]
    puts params[:password]
    query = 'INSERT INTO users (first_name, last_name, email, password) values ("'+ params[:first_name]+'","'+params[:last_name]+'","'+params[:email]+'","'+params[:password]+'");'
    puts query
    result = db.execute(query)
   
rescue
   redirect '/already-exist-error.html'
else
    
 redirect '/login.html'
    end

end
get '/splash-page'do 
    redirect '/splash-page.html'
end