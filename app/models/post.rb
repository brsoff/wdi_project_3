class Post < ActiveRecord::Base
  belongs_to :user
  # has_one :item

  def self.get_posts(current_user)
    user = User.find(current_user.id)
    following = user.followed_users
    @posts = Array.new
    following.each do |followed_user|
      followed_user.posts.each do |post|
        @posts << post
      end
    end
    return @posts
  end

  def self.get_user_posts(user)
    user = User.find(current_user.id)
    following = user.followed_users
    @posts = Array.new
    following.each do |followed_user|
      followed_user.posts.each do |post|
        @posts << post
      end
    end
    return @posts
  end

  def self.add_post(params, user)
    web_url = Post.format_url(params[:item_url])
    image_url = Post.format_url(params[:item_image_url])
    @post = Post.create(message: params[:message], user_id: user.id, item_name: params[:item_name], item_url: web_url, item_category: params[:item_category], user_name: user.name, username: user.username, item_image_url: image_url)
  end


  def self.get_watched(user)
    @posts = Watchlist.where(user: user)
  end

  def self.format_url(url)
    if url == ""
      url
    elsif url == nil
      nil
    elsif url.scan(/\Ahttp:\/\//) == ["http:\/\/"]
      url
    else
      http = "http:\/\/"
      url = url.split("").unshift(http).join("")
    end
    return url
  end

  def self.order_posts(array)
    # @posts = array.sort_by &:created_at
    # @posts = @posts.reverse
    # @posts

    array.sort_by do |post|
      post.created_at
    end
  end
end
