import React, { useState } from "react";
import Annotation from "react-image-annotation";
import {
  RectangleSelector,
  OvalSelector,
  PointSelector
} from "react-image-annotation/lib/selectors";
import mocks from "./mocks";
import img from "./img.jpg";

const Box = ({ children, geometry, style }) => (
  <div
    style={{
      ...style,
      position: "absolute",
      left: `${geometry.x}%`,
      top: `${geometry.y}%`,
      height: `${geometry.height}%`,
      width: `${geometry.width}%`
    }}
  >
    {children}
  </div>
);

function Custom() {
  const [annotations, setAnnotations] = useState(mocks.annotations);
  const [activeAnnotations, setActiveAnnotations] = useState([]);
  const [type, setType] = useState(RectangleSelector.TYPE);
  const [annotation, setAnnotation] = useState({});
  const [editing, setEditing] = useState(false);
  const [inside, setInside] = useState(false);

  const onChangeType = (e) => {
    setType(e.currentTarget.innerHTML);
    setAnnotation({});
  };

  const onChange = (annotation) => {
    setAnnotation(annotation);
  };

  const onSubmit = ({ geometry, data }) => {
    setAnnotations((annotations) => [
      {
        geometry,
        data: {
          ...data,
          id: Math.random()
        }
      },
      ...annotations
    ]);
    setAnnotation({});
    setEditing(false);
  };

  const onMouseOver = (id) => (e) => {
    setActiveAnnotations((activeAnnotations) => [...activeAnnotations, id]);
  };

  const onMouseOut = (id) => (e) => {
    const index = activeAnnotations.indexOf(id);
    setActiveAnnotations([
      activeAnnotations.slice(0, index),
      activeAnnotations.slice(index + 1)
    ]);
  };

  const activeAnnotationComparator = (a, b) => {
    return a.data.id === b;
  };

  return (
    <div>
      <div className="uk-margin uk-grid-small" data-uk-grid>
        <div>
          <button onClick={onChangeType}>{RectangleSelector.TYPE}</button>
        </div>
        <div>
          <button onClick={onChangeType}>{PointSelector.TYPE}</button>
        </div>
        <div>
          <button onClick={onChangeType}>{OvalSelector.TYPE}</button>
        </div>
        <div>{type}</div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={inside}
              onChange={(e) => setInside(e.target.checked)}
            />{" "}
            INSIDE
          </label>
        </div>
      </div>

      <div className="uk-margin" data-uk-grid>
        <div className="uk-width-2-3">
          <Annotation
            src={img}
            alt="Hello World"
            type={type}
            annotations={annotations}
            activeAnnotations={activeAnnotations}
            activeAnnotationComparator={activeAnnotationComparator}
            value={annotation}
            onChange={onChange}
            onSubmit={onSubmit}
            renderSelector={({ annotation: { geometry } }) => (
              <Box
                geometry={geometry}
                style={{
                  border: "3px solid #f0506e",
                  ...(type === "OVAL" && { borderRadius: "50%" })
                }}
              ></Box>
            )}
            renderEditor={({ annotation, onChange, onSubmit }) => {
              if (!inside) {
                setEditing(true);
                return null;
              }
              const { geometry } = annotation;
              return (
                <div
                  style={{
                    position: "absolute",
                    left: `${geometry.x}%`,
                    top: `${geometry.y + geometry.height + 2}%`
                  }}
                >
                  <input
                    onChange={(e) =>
                      onChange({
                        ...annotation,
                        data: {
                          ...annotation.data,
                          text: e.target.value
                        }
                      })
                    }
                  />
                  <button onClick={onSubmit}>Comment</button>
                </div>
              );
            }}
            renderHighlight={({ annotation: { geometry, data } }) => (
              <Box
                key={data.id}
                geometry={geometry}
                style={{ border: "solid 3px #1e87f0" }}
              ></Box>
            )}
            renderContent={({ annotation: { data, geometry } }) => (
              <div
                key={data.id}
                style={{
                  backgroundColor: "#1e87f0",
                  color: "#fff",
                  padding: "4px 8px",
                  position: "absolute",
                  borderRadius: 4,
                  left: `${geometry.x}%`,
                  top: `${geometry.y + geometry.height}%`
                }}
              >
                {data.text}
              </div>
            )}
            renderOverlay={() => (
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.3)",
                  position: "absolute",
                  top: 0,
                  left: 0
                }}
              ></div>
            )}
          />
        </div>
        <div className="uk-width-1-3">
          {editing && (
            <div>
              <input
                onChange={(e) =>
                  onChange({
                    ...annotation,
                    data: {
                      ...annotation.data,
                      text: e.target.value
                    }
                  })
                }
              />
              <button onClick={() => onSubmit(annotation)}>Comment</button>
            </div>
          )}
          <ul className="uk-list uk-list-divider">
            {annotations.map((a) => (
              <li
                onMouseOver={onMouseOver(a.data.id)}
                onMouseOut={onMouseOut(a.data.id)}
                key={a.data.id}
              >
                {a.data.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Custom;
