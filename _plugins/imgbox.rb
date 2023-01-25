#!/usr/bin/env ruby

module MyPlugins
  class IMGBOX < Liquid::Block
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
      "<div class=\"imgbox\">#{html}</div>"
    end
  end
end

Liquid::Template.register_tag("imgbox", MyPlugins::IMGBOX)
