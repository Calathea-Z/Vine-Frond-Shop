import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

const GoogleMapCustomOverlay = ({
	map,
	google,
	position,
	children,
	onClose,
}) => {
	const divRef = useRef();
	const rootRef = useRef();
	const [isUnmounting, setIsUnmounting] = useState(false);

	useEffect(() => {
		function CustomOverlay(map, position) {
			this.position = position;
			this.div = document.createElement("div");
			this.setMap(map);
		}

		CustomOverlay.prototype = new google.maps.OverlayView();

		CustomOverlay.prototype.onAdd = function () {
			this.div.style.position = "absolute";
			divRef.current = this.div;
			this.getPanes().floatPane.appendChild(this.div);
			if (!rootRef.current) {
				rootRef.current = createRoot(this.div);
			}
		};

		CustomOverlay.prototype.draw = function () {
			const overlayProjection = this.getProjection();
			const sw = overlayProjection.fromLatLngToDivPixel(
				new google.maps.LatLng(this.position.lat, this.position.lng)
			);
			const div = divRef.current;
			div.style.left = `${sw.x}px`;
			div.style.top = `${sw.y}px`;
			if (rootRef.current && !isUnmounting) {
				rootRef.current.render(
					<div className="custom-overlay flex flex-col">
						<button
							className="text-white font-bold rounded-full p-1 bg-black h-5 w-5 flex items-center justify-center self-end"
							onClick={onClose}
						>
							X
						</button>
						{children}
					</div>
				);
			}
		};
		CustomOverlay.prototype.onRemove = function () {
			setIsUnmounting(true);
			if (divRef.current) {
				if (rootRef.current) {
					setTimeout(() => {
						if (rootRef.current) {
							rootRef.current.unmount();
							rootRef.current = null;
						}
						if (divRef.current) {
							divRef.current.parentNode.removeChild(divRef.current);
							divRef.current = null;
						}
						setIsUnmounting(false);
					}, 0);
				}
			}
		};

		const overlay = new CustomOverlay(map, position);

		return () => {
			overlay.setMap(null);
		};
	}, [map, google, position, children, onClose, isUnmounting]);

	return null;
};

export default GoogleMapCustomOverlay;
