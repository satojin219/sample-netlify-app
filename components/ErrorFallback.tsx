import { ErrorBoundary } from "react-error-boundary";

type Props = {
    error: any
}
export const ErrorFallback: React.VFC<Props> = (props) => {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{props.error.message}</pre>
      </div>
    );
    
}
export default ErrorFallback