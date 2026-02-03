// import { Component, ErrorInfo, ReactNode } from 'react';
// import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

// interface Props {
//   children: ReactNode;
// }

// interface State {
//   hasError: boolean;
//   error: Error | null;
// }

// class ErrorBoundary extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error: Error): State {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
//     console.error('Error caught by boundary:', error, errorInfo);
//   }

//   handleReset = (): void => {
//     this.setState({ hasError: false, error: null });
//     window.location.reload();
//   };

//   render(): ReactNode {
//     if (this.state.hasError) {
//       return (
//         <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//           <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//             <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//               <div className="text-center">
//                 <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
//                   <FiAlertTriangle className="h-6 w-6 text-red-600" />
//                 </div>
//                 <h3 className="mt-6 text-lg font-medium text-gray-900">
//                   Something went wrong
//                 </h3>
//                 <p className="mt-2 text-sm text-gray-600">
//                   {this.state.error?.message || 'An unexpected error occurred'}
//                 </p>
//                 <div className="mt-6">
//                   <button
//                     onClick={this.handleReset}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//                   >
//                     <FiRefreshCw className="mr-2 h-4 w-4" />
//                     Try again
//                   </button>
//                 </div>
//                 <div className="mt-6">
//                   <a
//                     href="/"
//                     className="text-sm text-primary-600 hover:text-primary-500"
//                   >
//                     Return to home
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
