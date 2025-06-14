import * as Icon from './icons'

export function Banner() {
  return (
    <div className="gradient-primary bg-gradient-to-r py-3 text-center">
      <div className="container flex items-center justify-center">
        <p className="flex gap-2 font-medium">
          <span className="hidden sm:inline">
            Transform your PDFs with AI-powered conversations.
          </span>
          <a
            href="#"
            className="flex items-center gap-1 underline underline-offset-4"
          >
            Start Free Today
            <span>
              <Icon.ArrowRight />
            </span>
          </a>
        </p>
      </div>
    </div>
  )
}
