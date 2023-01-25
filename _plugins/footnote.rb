#!/usr/bin/env ruby

module MyPlugins
  class FN < Liquid::Tag
    def initialize(tag_name, fnid, tokens)
      @fnid = fnid.strip
    end
    def render(context)
      "<sup id=\"rfn-#{@fnid}\" class=\"footnote\"><a href=\"#fn-#{@fnid}\" fnid=\"#{@fnid}\" onmouseover=\"fn_mouseover('#{@fnid}');\" onmouseout=\"fn_mouseout();\"></a></sup>"
    end
  end

  class FNC < Liquid::Block
    def initialize(tag_name, fnid, tokens)
      @fnid = fnid.strip
      super
    end

    def render(context)
      body = super
      site = context.registers[:site]
      converter =
      if site.respond_to?(:find_converter_instance)
        site.find_converter_instance(Jekyll::Converters::Markdown)
      else
        site.getConverterImpl(Jekyll::Converters::Markdown)
      end
      html = converter.convert(body)
      html = html.split("<p>")[1].split("</p>")[0]
      "<li id=\"fn-#{@fnid}\" class=\"footnote\"><a href=\"#rfn-#{@fnid}\" fnid=\"#{@fnid}\"></a><span>#{html}</span></li>"
    end
  end

  class FNBOX < Liquid::Block
    def render(context)
      body = super
      "<ol id=\"post-footnotes\">#{body}</ol>"
    end
  end
end

Liquid::Template.register_tag("fn", MyPlugins::FN)
Liquid::Template.register_tag("fnc", MyPlugins::FNC)
Liquid::Template.register_tag("fnbox", MyPlugins::FNBOX)
