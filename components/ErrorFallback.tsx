import { ErrorBoundary } from "react-error-boundary";
import { FallbackProps } from "react-error-boundary";
type Props = {
  error: FallbackProps
  
}
export const ErrorFallback = ({ error } :FallbackProps) => {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
      </div>
    );
    
}
export default ErrorFallback