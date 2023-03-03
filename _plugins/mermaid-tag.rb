#!/usr/bin/env ruby

module MyPlugins
  class MERMAID < Liquid::Block
    def render(context)
      body = super
      "<div class=\"mermaid\">#{body}</div>"
    end
  end
end

Liquid::Template.register_tag("mermaid", MyPlugins::MERMAID)
