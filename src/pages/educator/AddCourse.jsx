import React, { useEffect, useState, useRef, useContext } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { AppContext } from '../../context/AppContext';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const { currency, allCourses } = useContext(AppContext);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapter, setCurrentChapter] = useState({ title: '', id: null });
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });
  const [showLecturePopup, setShowLecturePopup] = useState(false);
  const [currentLectureId, setCurrentLectureId] = useState(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
        placeholder: 'Write your course description here...',
      });
    }
  }, []);

  // If editing an existing chapter, fill the form
  useEffect(() => {
    if (currentChapterId) {
      const chapter = chapters.find(c => c.id === currentChapterId);
      if (chapter) {
        setCurrentChapter({ title: chapter.title, id: chapter.id });
      }
    }
  }, [currentChapterId, chapters]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get the course description from Quill editor
    const courseDescription = quillRef.current ? quillRef.current.root.innerHTML : '';
    
    // Create the course object
    const newCourse = {
      id: uniqid(),
      title: courseTitle,
      description: courseDescription,
      price: parseFloat(coursePrice),
      discount: parseFloat(discount),
      image: image,
      chapters: chapters,
      createdAt: new Date().toISOString(),
    };
    
    // Here you would typically send this data to your backend/API
    console.log('Submitting course:', newCourse);
    
    // You could also add it to your context if needed
    // addCourse(newCourse);
    
    // Reset form or redirect after submission
    alert('Course saved successfully!');
  };

  const handleChapterSubmit = () => {
    if (!currentChapter.title.trim()) return;
    
    if (currentChapterId) {
      // Edit existing chapter
      setChapters(prev => 
        prev.map(ch => ch.id === currentChapterId 
          ? { ...ch, title: currentChapter.title } 
          : ch
        )
      );
    } else {
      // Add new chapter
      const newChapter = {
        id: uniqid(),
        title: currentChapter.title,
        lectures: []
      };
      setChapters(prev => [...prev, newChapter]);
    }
    
    // Reset and close popup
    setCurrentChapter({ title: '', id: null });
    setCurrentChapterId(null);
    setShowPopup(false);
  };

  const handleChapterDelete = (chapterId) => {
    if (window.confirm('Are you sure you want to delete this chapter?')) {
      setChapters(prev => prev.filter(ch => ch.id !== chapterId));
    }
  };

  const handleAddLecture = (chapterId) => {
    setCurrentChapterId(chapterId);
    setCurrentLectureId(null);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
    setShowLecturePopup(true);
  };

  const handleLectureSubmit = () => {
    if (!lectureDetails.lectureTitle.trim()) return;
    
    const newLecture = {
      id: currentLectureId || uniqid(),
      title: lectureDetails.lectureTitle,
      duration: lectureDetails.lectureDuration,
      url: lectureDetails.lectureUrl,
      isPreviewFree: lectureDetails.isPreviewFree
    };
    
    setChapters(prev => 
      prev.map(ch => {
        if (ch.id === currentChapterId) {
          // If editing an existing lecture
          if (currentLectureId) {
            return {
              ...ch,
              lectures: ch.lectures.map(lec => 
                lec.id === currentLectureId ? newLecture : lec
              )
            };
          } 
          // If adding a new lecture
          else {
            return {
              ...ch,
              lectures: [...(ch.lectures || []), newLecture]
            };
          }
        }
        return ch;
      })
    );
    
    // Reset and close popup
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
    setShowLecturePopup(false);
    setCurrentLectureId(null);
  };

  const handleLectureDelete = (chapterId, lectureId) => {
    if (window.confirm('Are you sure you want to delete this lecture?')) {
      setChapters(prev => 
        prev.map(ch => {
          if (ch.id === chapterId) {
            return {
              ...ch,
              lectures: ch.lectures.filter(lec => lec.id !== lectureId)
            };
          }
          return ch;
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Course</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Course Title</label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Enter course title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Course Thumbnail */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Course Thumbnail</label>
            <div className="flex items-center space-x-4">
              {image ? (
                <img src={image} alt="Course thumbnail" className="h-24 w-32 object-cover rounded-md" />
              ) : (
                <div className="h-24 w-32 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Upload Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Course Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Course Description</label>
            <div 
              ref={editorRef} 
              className="h-64 border border-gray-300 rounded-md bg-white"
            ></div>
          </div>

          {/* Pricing Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Course Price ({currency})</label>
              <input
                type="number"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                placeholder="0.00"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="0"
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Chapters and Lectures Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">Course Content</h2>
              <button
                type="button"
                onClick={() => {
                  setCurrentChapter({ title: '', id: null });
                  setCurrentChapterId(null);
                  setShowPopup(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Chapter
              </button>
            </div>

            {/* Chapters List */}
            {chapters.length > 0 ? (
              <div className="space-y-4">
                {chapters.map((chapter) => (
                  <div key={chapter.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{chapter.title}</h3>
                      <div className="space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentChapterId(chapter.id);
                            setCurrentChapter({ title: chapter.title, id: chapter.id });
                            setShowPopup(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleChapterDelete(chapter.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    {/* Lectures List */}
                    <div className="pl-4 space-y-2">
                      {chapter.lectures && chapter.lectures.length > 0 ? (
                        chapter.lectures.map(lecture => (
                          <div key={lecture.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                            <div>
                              <p className="text-sm">{lecture.title} {lecture.isPreviewFree && <span className="text-xs text-green-600">(Preview)</span>}</p>
                              <p className="text-xs text-gray-500">{lecture.duration}</p>
                            </div>
                            <div className="space-x-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setCurrentChapterId(chapter.id);
                                  setCurrentLectureId(lecture.id);
                                  setLectureDetails({
                                    lectureTitle: lecture.title,
                                    lectureDuration: lecture.duration,
                                    lectureUrl: lecture.url,
                                    isPreviewFree: lecture.isPreviewFree
                                  });
                                  setShowLecturePopup(true);
                                }}
                                className="text-xs text-blue-600 hover:text-blue-800"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleLectureDelete(chapter.id, lecture.id)}
                                className="text-xs text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No lectures added</p>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => handleAddLecture(chapter.id)}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Lecture
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No chapters added yet
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Course
            </button>
          </div>
        </form>
      </div>

      {/* Chapter Add/Edit Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              {currentChapterId ? 'Edit Chapter' : 'Add New Chapter'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chapter Title</label>
                <input
                  type="text"
                  value={currentChapter.title}
                  onChange={(e) => setCurrentChapter({ ...currentChapter, title: e.target.value })}
                  placeholder="Enter chapter title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPopup(false);
                    setCurrentChapter({ title: '', id: null });
                    setCurrentChapterId(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleChapterSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  {currentChapterId ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lecture Add/Edit Popup */}
      {showLecturePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              {currentLectureId ? 'Edit Lecture' : 'Add New Lecture'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lecture Title</label>
                <input
                  type="text"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                  placeholder="Enter lecture title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                  placeholder="e.g. 10:30"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                <input
                  type="text"
                  value={lectureDetails.lectureUrl}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                  placeholder="Enter video URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPreviewFree"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="isPreviewFree" className="ml-2 text-sm text-gray-700">
                  Available in preview (free)
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowLecturePopup(false);
                    setLectureDetails({
                      lectureTitle: '',
                      lectureDuration: '',
                      lectureUrl: '',
                      isPreviewFree: false,
                    });
                    setCurrentLectureId(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLectureSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  {currentLectureId ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;