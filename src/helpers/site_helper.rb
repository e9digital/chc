module SiteHelper
  def full_page_title
    [@page_title, @site_name].compact.join(@title_delimiter)
  end
end
