// // Updated version of your component with proper integration

"use client";
import { useGetEphemeralKeys } from "@/api/virtual-card";
import { useProfile } from "@/hooks/use-profile";
import { catchErrFunc } from "@/lib/utils/catchErrFunc";
import { useCreateVirtualCardStore } from "@/store/createVirtualCardStore";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiCheckCircle, BiCreditCard, BiPlus, BiShield } from "react-icons/bi";
import { BsArrowRight, BsEye, BsEyeSlash } from "react-icons/bs";
import { CiLock } from "react-icons/ci";

// const NewVirtualCardView = () => {
//   const [showCardDetails, setShowCardDetails] = useState(false);
//   const [cardMounted, setCardMounted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const { profileData } = useProfile();
//   const cardID = useCreateVirtualCardStore(
//     (state) => state.data.cardId as string
//   );

//   const { mutateAsync: mutateGetEphemeralKeys } = useGetEphemeralKeys();
//   const stripe = useStripe();
//   const elements = useElements();

//   // Store references to mounted elements for proper cleanup
//   const mountedElementsRef = useRef({});

//   const formatCurrency = (amount, currency) => {
//     return `₦${amount.toLocaleString()}.00`;
//   };

//   // Improved cleanup function
//   const cleanupElements = useCallback(() => {
//     // Unmount Stripe elements properly
//     Object.values(mountedElementsRef.current).forEach((element) => {
//       try {
//         if (element && element.unmount) {
//           element.unmount();
//         }
//       } catch (error) {
//         console.warn("Error unmounting element:", error);
//       }
//     });

//     // Clear the refs
//     mountedElementsRef.current = {};

//     // Clear DOM elements
//     const elementIds = [
//       "card-number-svg",
//       "card-cvc-svg",
//       "card-expiry-svg",
//       "card-number-detail",
//       "card-cvc-detail",
//       "card-expiry-detail",
//     ];

//     elementIds.forEach((id) => {
//       const element = document.getElementById(id);
//       if (element) {
//         element.innerHTML = "";
//       }
//     });

//     console.log("Cleaned up elements");
//   }, []);

//   // Fixed displayCardCredentials function
//   const displayCardCredentials = useCallback(async () => {
//     if (!stripe || !elements || !cardID) {
//       console.warn("Missing dependencies:", {
//         stripe: !!stripe,
//         elements: !!elements,
//         cardID,
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Clean up existing elements first
//       cleanupElements();

//       // Wait for DOM cleanup
//       await new Promise((resolve) => setTimeout(resolve, 100));

//       // Create ephemeral key nonce
//       const nonceResult = await stripe.createEphemeralKeyNonce({
//         issuingCard: cardID,
//       });

//       if (!nonceResult.nonce) {
//         throw new Error("Failed to create ephemeral key nonce");
//       }

//       const ephemeralData = await mutateGetEphemeralKeys({
//         card_id: cardID,
//         nonce: nonceResult.nonce,
//       });

//       if (!ephemeralData?.data) {
//         throw new Error("Failed to get ephemeral key data");
//       }

//       // Common element configuration
//       const baseConfig = {
//         issuingCard: cardID,
//         nonce: nonceResult.nonce,
//         ephemeralKeySecret: ephemeralData.data,
//       };

//       // Create and mount elements for SVG card
//       const svgElements = [
//         {
//           type: "issuingCardNumberDisplay",
//           id: "card-number-svg",
//           style: {
//             base: {
//               color: "#ffffff",
//               fontSize: "14px",
//               fontFamily:
//                 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
//               letterSpacing: "1px",
//             },
//           },
//         },
//         {
//           type: "issuingCardCvcDisplay",
//           id: "card-cvc-svg",
//           style: {
//             base: {
//               color: "#ffffff",
//               fontSize: "14px",
//               fontFamily:
//                 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
//             },
//           },
//         },
//         {
//           type: "issuingCardExpiryDisplay",
//           id: "card-expiry-svg",
//           style: {
//             base: {
//               color: "#ffffff",
//               fontSize: "14px",
//               fontFamily:
//                 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
//             },
//           },
//         },
//       ];

//       // Mount SVG elements
//       for (const config of svgElements) {
//         const domElement = document.getElementById(config.id);
//         if (domElement) {
//           try {
//             const stripeElement = elements.create(config.type, {
//               ...baseConfig,
//               style: config.style,
//             });

//             await stripeElement.mount(`#${config.id}`);
//             mountedElementsRef.current[config.id] = stripeElement;
//             console.log(`Successfully mounted ${config.type} to ${config.id}`);
//           } catch (error) {
//             console.error(
//               `Error mounting ${config.type} to ${config.id}:`,
//               error
//             );
//           }
//         } else {
//           console.warn(`Element ${config.id} not found in DOM`);
//         }
//       }

//       // Always create detail elements when showing details
//       const detailElements = [
//         {
//           type: "issuingCardNumberDisplay",
//           id: "card-number-detail",
//           style: {
//             base: {
//               color: "#111827",
//               fontSize: "16px",
//               fontFamily:
//                 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
//               letterSpacing: "1px",
//             },
//           },
//         },
//         {
//           type: "issuingCardCvcDisplay",
//           id: "card-cvc-detail",
//           style: {
//             base: {
//               color: "#111827",
//               fontSize: "16px",
//               fontFamily:
//                 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
//             },
//           },
//         },
//         {
//           type: "issuingCardExpiryDisplay",
//           id: "card-expiry-detail",
//           style: {
//             base: {
//               color: "#111827",
//               fontSize: "16px",
//               fontFamily:
//                 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
//             },
//           },
//         },
//       ];

//       // Mount detail elements (they will be created fresh each time)
//       for (const config of detailElements) {
//         const domElement = document.getElementById(config.id);
//         if (domElement) {
//           try {
//             const stripeElement = elements.create(config.type, {
//               ...baseConfig,
//               style: config.style,
//             });

//             await stripeElement.mount(`#${config.id}`);
//             mountedElementsRef.current[config.id] = stripeElement;
//             console.log(`Successfully mounted ${config.type} to ${config.id}`);
//           } catch (error) {
//             console.error(
//               `Error mounting ${config.type} to ${config.id}:`,
//               error
//             );
//           }
//         }
//       }

//       setCardMounted(true);
//       setShowCardDetails(true);
//     } catch (err) {
//       console.error("Error in displayCardCredentials:", err);
//       // Show user-friendly error message
//       alert("Failed to load card details. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [stripe, elements, cardID, mutateGetEphemeralKeys, cleanupElements]);

//   // Toggle card details visibility
//   const toggleCardDetails = async () => {
//     if (showCardDetails) {
//       // Hide details - clean up elements and show placeholder
//       cleanupElements();
//       setShowCardDetails(false);

//       // Show placeholders in SVG
//       const svgElementIds = [
//         "card-number-svg",
//         "card-cvc-svg",
//         "card-expiry-svg",
//       ];
//       svgElementIds.forEach((id) => {
//         const element = document.getElementById(id);
//         if (element) {
//           element.innerHTML = '<span class="text-gray-400">•••</span>';
//         }
//       });
//     } else {
//       // Show details - remount elements (don't set cardMounted to false)
//       await displayCardCredentials();
//     }
//   };

//   // Auto-display card when cardID is available
//   useEffect(() => {
//     if (cardID && !cardMounted && stripe && elements) {
//       displayCardCredentials();
//     }
//   }, [cardID, cardMounted, displayCardCredentials, stripe, elements]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       cleanupElements();
//     };
//   }, [cleanupElements]);

//   // Your custom SVG card component with FIXED unique IDs
//   const CustomVirtualCard = ({ balance, showDetails }) => (
//     <div className="relative w-full max-w-sm mx-auto mb-6">
//       <svg
//         width="100%"
//         height="100%"
//         viewBox="0 0 315 184"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="drop-shadow-lg"
//       >
//         <rect width="315" height="184" fill="white" />
//         <rect width="315" height="184" rx="30" fill="url(#paint0_linear_0_1)" />
//         <mask
//           id="mask0_0_1"
//           maskUnits="userSpaceOnUse"
//           x="0"
//           y="0"
//           width="315"
//           height="184"
//         >
//           <rect width="315" height="184" rx="30" fill="#ED713C" />
//         </mask>
//         <g mask="url(#mask0_0_1)">
//           <ellipse
//             opacity="0.1"
//             cx="24.5"
//             cy="213"
//             rx="160.5"
//             ry="113"
//             fill="black"
//           />
//           <ellipse
//             opacity="0.08"
//             cx="290.5"
//             cy="-29"
//             rx="160.5"
//             ry="113"
//             fill="black"
//           />
//         </g>

//         {/* Expiry Date */}
//         <foreignObject x="240" y="145" width="70" height="20">
//           <div
//             id="card-expiry-svg"
//             className="text-white text-sm font-mono"
//           ></div>
//         </foreignObject>

//         {/* Card Number */}
//         <foreignObject x="25" y="145" width="200" height="20">
//           <div
//             id="card-number-svg"
//             className="text-white text-sm font-mono opacity-90"
//           ></div>
//         </foreignObject>

//         {/* CVC */}
//         <foreignObject x="25" y="120" width="50" height="20">
//           <div
//             id="card-cvc-svg"
//             className="text-white text-xs font-mono opacity-75"
//           ></div>
//         </foreignObject>

//         {/* Mastercard Logo */}
//         <path
//           d="M256.416 27.9742H268.584V49.8367H256.416V27.9742Z"
//           fill="#FF5F00"
//         />
//         <path
//           d="M257.189 38.9055C257.189 34.4635 259.275 30.5236 262.48 27.9742C260.124 26.1201 257.15 25 253.906 25C246.219 25 240 31.2188 240 38.9055C240 46.5921 246.219 52.811 253.906 52.811C257.15 52.811 260.124 51.6909 262.48 49.8367C259.275 47.326 257.189 43.3475 257.189 38.9055Z"
//           fill="#EB001B"
//         />
//         <path
//           d="M285 38.9055C285 46.5921 278.781 52.811 271.094 52.811C267.849 52.811 264.875 51.6909 262.519 49.8367C265.764 47.2874 267.811 43.3475 267.811 38.9055C267.811 34.4635 265.725 30.5236 262.519 27.9742C264.875 26.1201 267.849 25 271.094 25C278.781 25 285 31.2575 285 38.9055H285Z"
//           fill="#F79E1B"
//         />

//         {/* Balance */}
//         <text
//           fill="white"
//           xmlSpace="preserve"
//           fontFamily="Inter, system-ui, sans-serif"
//           fontSize="28"
//           letterSpacing="0px"
//         >
//           <tspan x="30" y="78.124">
//             {formatCurrency(balance || 0, "NGN")}
//           </tspan>
//         </text>

//         {/* Balance Label */}
//         <text
//           opacity="0.8"
//           fill="white"
//           xmlSpace="preserve"
//           fontFamily="Inter, system-ui, sans-serif"
//           fontSize="14"
//           letterSpacing="0px"
//         >
//           <tspan x="30" y="43.312">
//             Current Balance
//           </tspan>
//         </text>

//         <defs>
//           <linearGradient
//             id="paint0_linear_0_1"
//             x1="158.586"
//             y1="-30.5053"
//             x2="165.299"
//             y2="207.036"
//             gradientUnits="userSpaceOnUse"
//           >
//             <stop stopColor="#4AF32C" />
//             <stop offset="1" stopColor="#1A4510" />
//           </linearGradient>
//         </defs>
//       </svg>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-md mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">Virtual Card</h1>
//           {cardID && (
//             <button
//               onClick={toggleCardDetails}
//               disabled={isLoading}
//               className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
//             >
//               {isLoading ? (
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : showCardDetails ? (
//                 <BsEyeSlash />
//               ) : (
//                 <BsEye />
//               )}
//               <span>
//                 {isLoading ? "Loading..." : showCardDetails ? "Hide" : "Show"}
//               </span>
//             </button>
//           )}
//         </div>

//         {/* Card Display */}
//         <CustomVirtualCard
//           balance={profileData?.balance || 0}
//           showDetails={showCardDetails}
//         />

//         {/* Additional Card Details Panel (when showing details) */}
//         {showCardDetails && cardMounted && (
//           <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <BiShield className="w-5 h-5 text-green-500 mr-2" />
//               Secure Card Details
//             </h3>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Card Number
//                 </label>
//                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//                   <div className="text-lg font-mono tracking-wider text-gray-900">
//                     <div
//                       id="card-number-detail"
//                       className="text-gray-900"
//                     ></div>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     CVC
//                   </label>
//                   <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//                     <div
//                       id="card-cvc-detail"
//                       className="text-lg font-mono text-gray-900"
//                     ></div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Expires
//                   </label>
//                   <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//                     <div
//                       id="card-expiry-detail"
//                       className="text-lg font-mono text-gray-900"
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//               <p className="text-sm text-blue-800">
//                 <CiLock className="w-4 h-4 inline mr-1" />
//                 Your card details are securely managed by Stripe and encrypted
//                 at all times.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Card Actions */}
//         {cardID && (
//           <div className="bg-white rounded-xl p-6 shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Card Actions
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               <button className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
//                 <BiPlus className="w-5 h-5 text-gray-600" />
//                 <span className="text-sm font-medium text-gray-700">
//                   Add Funds
//                 </span>
//               </button>
//               <button className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
//                 <BiCreditCard className="w-5 h-5 text-gray-600" />
//                 <span className="text-sm font-medium text-gray-700">
//                   Transactions
//                 </span>
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Loading State */}
//         {isLoading && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
//               <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
//               <span className="text-gray-700">Loading card details...</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

const NewVirtualCardView = () => {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ephemeralData, setEphemeralData] = useState(null);

  const { profileData } = useProfile();
  const cardID = useCreateVirtualCardStore(
    (state) => state.data.cardId as string
  );

  const { mutateAsync: mutateGetEphemeralKeys } = useGetEphemeralKeys();
  const stripe = useStripe();
  const elements = useElements();

  // Store references to mounted elements for proper cleanup
  const mountedElementsRef = useRef({});

  const formatCurrency = (amount, currency) => {
    return `₦${amount.toLocaleString()}.00`;
  };

  // Improved cleanup function
  const cleanupElements = useCallback(() => {
    // Unmount Stripe elements properly
    Object.values(mountedElementsRef.current).forEach((element) => {
      try {
        if (element && element.unmount) {
          element.unmount();
        }
      } catch (error) {
        console.warn("Error unmounting element:", error);
      }
    });

    // Clear the refs
    mountedElementsRef.current = {};
  }, []);

  // Function to get ephemeral data (only call API once)
  const getEphemeralData = useCallback(async () => {
    if (!stripe || !cardID) return null;

    try {
      // Create ephemeral key nonce
      const nonceResult = await stripe.createEphemeralKeyNonce({
        issuingCard: cardID,
      });

      if (!nonceResult.nonce) {
        throw new Error("Failed to create ephemeral key nonce");
      }

      const ephemeralResponse = await mutateGetEphemeralKeys({
        card_id: cardID,
        nonce: nonceResult.nonce,
      });

      if (!ephemeralResponse?.data) {
        throw new Error("Failed to get ephemeral key data");
      }

      const data = {
        nonce: nonceResult.nonce,
        ephemeralKeySecret: ephemeralResponse.data,
      };

      setEphemeralData(data);
      return data;
    } catch (error) {
      console.error("Error getting ephemeral data:", error);
      return null;
    }
  }, [stripe, cardID, mutateGetEphemeralKeys]);

  // Function to mount elements with existing ephemeral data
  const mountElements = useCallback(
    async (ephemeralInfo) => {
      if (!stripe || !elements || !cardID || !ephemeralInfo) return;

      // Clean up existing elements first
      cleanupElements();

      // Wait for DOM cleanup
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Common element configuration
      const baseConfig = {
        issuingCard: cardID,
        nonce: ephemeralInfo.nonce,
        ephemeralKeySecret: ephemeralInfo.ephemeralKeySecret,
      };

      // Create and mount elements for SVG card
      const svgElements = [
        {
          type: "issuingCardNumberDisplay",
          id: "card-number-svg",
          style: {
            base: {
              color: "#ffffff",
              fontSize: "14px",
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              letterSpacing: "1px",
            },
          },
        },
        {
          type: "issuingCardCvcDisplay",
          id: "card-cvc-svg",
          style: {
            base: {
              color: "#ffffff",
              fontSize: "12px",
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            },
          },
        },
        {
          type: "issuingCardExpiryDisplay",
          id: "card-expiry-svg",
          style: {
            base: {
              color: "#ffffff",
              fontSize: "14px",
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            },
          },
        },
      ];

      // Mount SVG elements
      for (const config of svgElements) {
        const domElement = document.getElementById(config.id);
        if (domElement) {
          try {
            const stripeElement = elements.create(config.type, {
              ...baseConfig,
              style: config.style,
            });

            stripeElement.mount(`#${config.id}`);
            mountedElementsRef.current[config.id] = stripeElement;
            console.log(`Successfully mounted ${config.type} to ${config.id}`);
          } catch (error) {
            console.error(
              `Error mounting ${config.type} to ${config.id}:`,
              error
            );
          }
        } else {
          console.warn(`Element ${config.id} not found in DOM`);
        }
      }

      // Create elements for detail view if showing details
      if (showCardDetails) {
        const detailElements = [
          {
            type: "issuingCardNumberDisplay",
            id: "card-number-detail",
            style: {
              base: {
                color: "#111827",
                fontSize: "16px",
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                letterSpacing: "1px",
              },
            },
          },
          {
            type: "issuingCardCvcDisplay",
            id: "card-cvc-detail",
            style: {
              base: {
                color: "#111827",
                fontSize: "16px",
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              },
            },
          },
          {
            type: "issuingCardExpiryDisplay",
            id: "card-expiry-detail",
            style: {
              base: {
                color: "#111827",
                fontSize: "16px",
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              },
            },
          },
        ];

        // Mount detail elements
        for (const config of detailElements) {
          const domElement = document.getElementById(config.id);
          if (domElement) {
            try {
              const stripeElement = elements.create(config.type, {
                ...baseConfig,
                style: config.style,
              });

              stripeElement.mount(`#${config.id}`);
              mountedElementsRef.current[config.id] = stripeElement;
              console.log(
                `Successfully mounted ${config.type} to ${config.id}`
              );
            } catch (error) {
              console.error(
                `Error mounting ${config.type} to ${config.id}:`,
                error
              );
            }
          }
        }
      }
    },
    [stripe, elements, cardID, cleanupElements, showCardDetails]
  );

  // Main function to display card credentials
  const displayCardCredentials = useCallback(async () => {
    if (!stripe || !elements || !cardID) {
      console.warn("Missing dependencies:", {
        stripe: !!stripe,
        elements: !!elements,
        cardID,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Get ephemeral data if we don't have it
      let currentEphemeralData = ephemeralData;
      if (!currentEphemeralData) {
        currentEphemeralData = await getEphemeralData();
        if (!currentEphemeralData) {
          throw new Error("Failed to get ephemeral data");
        }
      }

      // Mount elements
      await mountElements(currentEphemeralData);
    } catch (err) {
      console.error("Error in displayCardCredentials:", err);
      alert("Failed to load card details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [
    stripe,
    elements,
    cardID,
    ephemeralData,
    getEphemeralData,
    mountElements,
  ]);

  // Toggle card details visibility
  const toggleCardDetails = async () => {
    if (showCardDetails) {
      // Hide details panel only - keep SVG card data visible
      setShowCardDetails(false);
    } else {
      // Show details panel and ensure all elements are mounted
      setShowCardDetails(true);

      // Re-mount elements to ensure detail panel is populated
      if (ephemeralData) {
        setIsLoading(true);
        await mountElements(ephemeralData);
        setIsLoading(false);
      } else {
        // Get fresh data if we don't have it
        await displayCardCredentials();
      }
    }
  };

  // Auto-display card when cardID is available
  useEffect(() => {
    if (cardID && stripe && elements && !ephemeralData) {
      displayCardCredentials();
    }
  }, [cardID, stripe, elements, ephemeralData, displayCardCredentials]);

  // Re-mount elements when showCardDetails changes
  useEffect(() => {
    if (ephemeralData && stripe && elements) {
      mountElements(ephemeralData);
    }
  }, [showCardDetails, ephemeralData, stripe, elements, mountElements]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupElements();
    };
  }, [cleanupElements]);

  // Your custom SVG card component
  const CustomVirtualCard = ({ balance, showDetails }) => (
    <div className="relative w-full max-w-sm mx-auto mb-6">
      <div className="relative w-[400px] h-[240px] rounded-2xl bg-gradient-to-br from-green-400 to-green-700 p-6 text-white shadow-lg">
        <div className="text-lg">Current Balance</div>
        <div className="text-3xl font-bold">₦0.00</div>

        {/* Stripe Secure Mounts */}
        <div
          id="card-number-svg"
          className="absolute bottom-16 left-6 w-[250px] h-[25px]"
        />
        <div
          id="card-expiry-svg"
          className="absolute bottom-8 left-[240px] w-[70px] h-[25px]"
        />
        <div
          id="card-cvc-svg"
          className="absolute bottom-8 left-6 w-[50px] h-[25px]"
        />
      </div>
      {
        // <svg
        //   width="100%"
        //   height="100%"
        //   viewBox="0 0 315 184"
        //   fill="none"
        //   xmlns="http://www.w3.org/2000/svg"
        //   className="drop-shadow-lg"
        // >
        //   {/* <rect width="315" height="184" fill="white" /> */}
        //   <rect width="315" height="184" rx="30" fill="url(#paint0_linear_0_1)" />
        //   <mask
        //     id="mask0_0_1"
        //     maskUnits="userSpaceOnUse"
        //     x="0"
        //     y="0"
        //     width="315"
        //     height="184"
        //   >
        //     <rect width="315" height="184" rx="30" fill="#ED713C" />
        //   </mask>
        //   <g mask="url(#mask0_0_1)">
        //     <ellipse
        //       opacity="0.1"
        //       cx="24.5"
        //       cy="213"
        //       rx="160.5"
        //       ry="113"
        //       fill="black"
        //     />
        //     <ellipse
        //       opacity="0.08"
        //       cx="290.5"
        //       cy="-29"
        //       rx="160.5"
        //       ry="113"
        //       fill="black"
        //     />
        //   </g>
        //   {/* Card Number */}
        //   <foreignObject x="25" y="120" width="200" height="25">
        //     <div
        //       id="card-number-svg"
        //       className="text-white text-sm font-mono opacity-90 flex items-center h-full"
        //     >
        //       1010293923029
        //     </div>
        //   </foreignObject>
        //   {/* Expiry Date */}
        //   <foreignObject x="240" y="145" width="70" height="25">
        //     <div
        //       id="card-expiry-svg"
        //       className="text-white text-sm font-mono flex items-center h-full"
        //     >
        //       32/12
        //     </div>
        //   </foreignObject>
        //   {/* CVC */}
        //   <foreignObject x="25" y="145" width="50" height="25">
        //     <div
        //       id="card-cvc-svg"
        //       className="text-white text-xs font-mono opacity-75 flex items-center h-full"
        //     >
        //       392
        //     </div>
        //   </foreignObject>
        //   {/* Mastercard Logo */}
        //   <path
        //     d="M256.416 27.9742H268.584V49.8367H256.416V27.9742Z"
        //     fill="#FF5F00"
        //   />
        //   <path
        //     d="M257.189 38.9055C257.189 34.4635 259.275 30.5236 262.48 27.9742C260.124 26.1201 257.15 25 253.906 25C246.219 25 240 31.2188 240 38.9055C240 46.5921 246.219 52.811 253.906 52.811C257.15 52.811 260.124 51.6909 262.48 49.8367C259.275 47.326 257.189 43.3475 257.189 38.9055Z"
        //     fill="#EB001B"
        //   />
        //   <path
        //     d="M285 38.9055C285 46.5921 278.781 52.811 271.094 52.811C267.849 52.811 264.875 51.6909 262.519 49.8367C265.764 47.2874 267.811 43.3475 267.811 38.9055C267.811 34.4635 265.725 30.5236 262.519 27.9742C264.875 26.1201 267.849 25 271.094 25C278.781 25 285 31.2575 285 38.9055H285Z"
        //     fill="#F79E1B"
        //   />
        //   {/* Balance */}
        //   <text
        //     fill="white"
        //     xmlSpace="preserve"
        //     fontFamily="Inter, system-ui, sans-serif"
        //     fontSize="28"
        //     letterSpacing="0px"
        //   >
        //     <tspan x="30" y="78.124">
        //       {formatCurrency(balance || 0, "NGN")}
        //     </tspan>
        //   </text>
        //   {/* Balance Label */}
        //   <text
        //     opacity="0.8"
        //     fill="white"
        //     xmlSpace="preserve"
        //     fontFamily="Inter, system-ui, sans-serif"
        //     fontSize="14"
        //     letterSpacing="0px"
        //   >
        //     <tspan x="30" y="43.312">
        //       Current Balance
        //     </tspan>
        //   </text>
        //   <defs>
        //     <linearGradient
        //       id="paint0_linear_0_1"
        //       x1="158.586"
        //       y1="-30.5053"
        //       x2="165.299"
        //       y2="207.036"
        //       gradientUnits="userSpaceOnUse"
        //     >
        //       <stop stopColor="#4AF32C" />
        //       <stop offset="1" stopColor="#1A4510" />
        //     </linearGradient>
        //   </defs>
        // </svg>
      }

      {
        // I can find a way to render normal html in svg so that I can display the card details inside it or a way to design the card like normal card
      }
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Virtual Card</h1>
          {cardID && (
            <button
              onClick={toggleCardDetails}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : showCardDetails ? (
                <BsEyeSlash />
              ) : (
                <BsEye />
              )}
              <span>
                {isLoading
                  ? "Loading..."
                  : showCardDetails
                  ? "Hide Details"
                  : "Show Details"}
              </span>
            </button>
          )}
        </div>

        {/* Card Display */}
        <CustomVirtualCard
          balance={profileData?.balance || 0}
          showDetails={showCardDetails}
        />

        {/* Additional Card Details Panel (when showing details) */}
        {showCardDetails && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BiShield className="w-5 h-5 text-green-500 mr-2" />
              Secure Card Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="text-lg font-mono tracking-wider text-gray-900">
                    <div
                      id="card-number-detail"
                      className="text-gray-900 min-h-[24px]"
                    ></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVC
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div
                      id="card-cvc-detail"
                      className="text-lg font-mono text-gray-900 min-h-[24px]"
                    ></div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expires
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div
                      id="card-expiry-detail"
                      className="text-lg font-mono text-gray-900 min-h-[24px]"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <CiLock className="w-4 h-4 inline mr-1" />
                Your card details are securely managed by Stripe and encrypted
                at all times.
              </p>
            </div>
          </div>
        )}

        {/* Card Actions */}
        {cardID && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Card Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                <BiPlus className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Add Funds
                </span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                <BiCreditCard className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Transactions
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700">Loading card details...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewVirtualCardView;
