import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

// GoogleMapCustomOverlay component definition
// This component is responsible for creating a custom overlay on a Google Map.
// It takes in props such as the map instance, google maps object, position for the overlay, children components, and an onClose function.
const GoogleMapCustomOverlay = ({
	map,
	google,
	position,
	children,
	onClose,
}) => {
	// useRef hooks to keep track of the div element and the React root instance for the overlay content.
	const divRef = useRef();
	const rootRef = useRef();
	// useState hook to manage the unmounting state of the overlay.
	const [isUnmounting, setIsUnmounting] = useState(false);

	// useEffect hook to handle the lifecycle of the custom overlay.
	useEffect(() => {
		// CustomOverlay constructor function, creates a new overlay instance.
		function CustomOverlay(map, position) {
			this.position = position; // Position of the overlay on the map.
			this.div = document.createElement("div"); // Creates a new div element for the overlay content.
			this.setMap(map); // Sets the map instance for the overlay.
		}

		// Inheriting from google.maps.OverlayView to integrate with Google Maps API.
		CustomOverlay.prototype = new google.maps.OverlayView();

		// onAdd method, called when the overlay is added to the map.
		CustomOverlay.prototype.onAdd = function () {
			this.div.style.position = "absolute"; // Sets the position style of the div to absolute.
			divRef.current = this.div; // Assigns the div element to the divRef.
			this.getPanes().floatPane.appendChild(this.div); // Appends the div to the floatPane of the map.
			if (!rootRef.current) {
				rootRef.current = createRoot(this.div); // Creates a React root instance for the div if it doesn't exist.
			}
		};

		// draw method, called to update the overlay's position or content.
		CustomOverlay.prototype.draw = function () {
			const overlayProjection = this.getProjection(); // Gets the map projection.
			const sw = overlayProjection.fromLatLngToDivPixel(
				new google.maps.LatLng(this.position.lat, this.position.lng) // Converts the overlay's LatLng position to pixel position on the map.
			);
			const div = divRef.current;
			div.style.left = `${sw.x - 102}px`; // Positions the div 3 rem to the left of the calculated position.
			div.style.top = `${sw.y}px`; // Positions the div at the calculated top position.
			if (rootRef.current && !isUnmounting) {
				// Renders the children components inside the div if it's not unmounting.
				rootRef.current.render(
					<div className="custom-overlay flex flex-col relative">
						{children}
						<button
							className="text-white font-bold rounded-full p-2 bg-[#008080]  h-5 w-5 flex items-center justify-center self-end absolute right-[-.4rem] mt-[-.01rem]"
							onClick={onClose}
						>
							X
						</button>
					</div>
				);
			}
		};
		// onRemove method, called when the overlay is removed from the map.
		CustomOverlay.prototype.onRemove = function () {
			setIsUnmounting(true); // Sets the unmounting state to true.
			if (divRef.current) {
				if (rootRef.current) {
					setTimeout(() => {
						if (rootRef.current) {
							rootRef.current.unmount(); // Unmounts the React root instance.
							rootRef.current = null; // Clears the rootRef.
						}
						if (divRef.current) {
							divRef.current.parentNode.removeChild(divRef.current); // Removes the div from its parent node.
							divRef.current = null; // Clears the divRef.
						}
						setIsUnmounting(false); // Resets the unmounting state.
					}, 0);
				}
			}
		};

		const overlay = new CustomOverlay(map, position); // Creates a new CustomOverlay instance.

		return () => {
			overlay.setMap(null); // Removes the overlay from the map on cleanup.
		};
	}, [map, google, position, children, onClose, isUnmounting]); // Dependencies for the useEffect hook.

	return null; // This component does not render anything itself.
};

export default GoogleMapCustomOverlay;
