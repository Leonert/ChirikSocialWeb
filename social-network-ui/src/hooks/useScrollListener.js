import { useEffect } from 'react';

// export const useScrollListener = (ref, callback) => {
//   useEffect(() => {
//     const handleScroll = (e) => {
//       if (
//         e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 100 &&
//         ref.current &&
//         ref.current.contains(e.target)
//       ) {
//         console.log('scroll');

//         callback();
//       }
//     };

//     const contentElement = ref.current;
//     contentElement.addEventListener('scroll', handleScroll);

//     return () => {
//       contentElement.removeEventListener('scroll', handleScroll);
//     };
//   }, [callback, ref]);
// };
