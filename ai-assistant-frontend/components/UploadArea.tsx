export default function UploadArea() {
    return (
      <div className="bg-white p-8 rounded max-w-2xl mx-auto shadow my-8">
        <h3 className="text-xl font-bold mb-4">Upload Notes, Docs or Emails</h3>
        <input type="file" multiple className="block w-full mb-4" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      </div>
    );
  }
  