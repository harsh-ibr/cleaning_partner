import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TextEditor({
  title,
  name,
  value,
  onChange,
  isRequired = false,
  error = "",
}) {
  const handleEditor = (content) => {
    const fakeEvent = {
      target: {
        name: name,
        value: content,
      },
    };

    onChange(fakeEvent); // 👈 now works like input onChange
  };

  const formatLabel = (text) => {
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <>
      {/* ✅ Component-scoped style */}
      <style>
        {`
          .tox-tinymce {
            border: 1px solid #000 !important;
            border-radius: 0.375rem;
          }

          .editor-error .tox-tinymce {
            border-color: #dc2626 !important;
          }
        `}
      </style>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-600 mb-1"
      >
        {title ? title : formatLabel(name)}
        {isRequired && <sup className="text-red-700">*</sup>}
      </label>
      <Editor
        apiKey="w4dl7hoic68ajhvx6jmbvxvyerat5qoajamm8xtk4zm05a6q"
        value={value} // 👈 controlled value
        onEditorChange={(content) => handleEditor(content)}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic underline strikethrough | forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | " +
            "link image media table | code preview fullscreen",
        }}
      />

      {error && <div className="text-red-700">{error}</div>}
    </>
  );
}
