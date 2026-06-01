import Button from './Button'

export default function ErrorState({ message = 'Something unexpected happened.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
      <h3 className="font-display text-[24px] text-text-primary mt-4 mb-2">
        Something went wrong
      </h3>
      <p className="font-body text-[13px] text-text-muted max-w-[360px] mb-6">
        {message}
      </p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}
