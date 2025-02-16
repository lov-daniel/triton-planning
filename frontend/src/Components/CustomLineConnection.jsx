import React from 'react';
import { useConnection } from '@xyflow/react';

export default ({ fromX, fromY, toX, toY, connectionLineStyle }) => {
  const { fromHandle } = useConnection(); // Destructure connection details, if needed

  // Define control points for cubic Bezier curve for smooth transition
  const controlPoint1X = fromX + (toX - fromX) / 2;
  const controlPoint1Y = fromY;
  const controlPoint2X = toX - (toX - fromX) / 2;
  const controlPoint2Y = toY;

  // Generate the cubic Bezier path data
  const pathData = `M${fromX},${fromY} C${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${toX},${toY}`;

  return (
    <g>
      <path
        fill="none"
        stroke={connectionLineStyle?.stroke || '#000'}  // Use stroke color from props or fallback to black
        strokeWidth={connectionLineStyle?.strokeWidth || 2}  // Use strokeWidth from props or default to 2
        className="animated"  // Optional: For animation effects
        d={pathData}  // Path data for cubic Bezier curve
      />
      <circle
        cx={toX}  // Position the circle at the end of the line
        cy={toY}
        fill={connectionLineStyle?.stroke || '#000'}  // Circle color matches the line's stroke color
        r={4}  // Size of the circle
      />
    </g>
  );
};
