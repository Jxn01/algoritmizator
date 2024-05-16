import React, {memo, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ReactMarkdown from 'react-markdown';
import {basicSetup, EditorView} from "codemirror";
import {EditorState} from "@codemirror/state";
import { oneDarkModified } from "../CodeMirrorTheme.ts";
import {python} from "@codemirror/lang-python";
import {javascript} from "@codemirror/lang-javascript";
import {java} from "@codemirror/lang-java";
import {cpp} from "@codemirror/lang-cpp";

/**
 * Task component
 */
export const Task = memo(({ id, title, activeTab }) => {
    const [assignment, setAssignment] = useState({});
    const [tasks, setTasks] = useState([]);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [timerStarted, setTimerStarted] = useState(false);
    const [timePassed, setTimePassed] = useState(0);
    const [answers, setAnswers] = useState({});
    const isFirstRun = useRef(true);
    const languageExtensions = {
        'python': python(),
        'javascript': javascript(),
        'java': java(),
        'cpp': cpp()
    }

    useEffect(() => {
        axios.get(`/algoritmizator/api/task/${id}`)
            .then(response => {
                setAssignment(response.data.assignment);
                setTasks(response.data.tasks);
                setCurrentTaskIndex(0);
            })
            .catch(error => {
                alert(error);
            });
    }, [id]);

    function resetEditors(){
        const editorContainers = document.querySelectorAll('.editor');
        editorContainers.forEach(editor => {
            editor.remove();
        });
    }

    function resetButtons(){
        const buttons = document.querySelectorAll('.buttonDiv');
        buttons.forEach(button => {
            button.remove();
        });
    }

    function groupCodeBlocks(){
        const codeElements = Array.from(document.querySelectorAll('pre code'));
        const groupedBlocks = [];
        let group = [];
        let placeholder = null;

        codeElements.forEach((codeElement, index) => {
            const languageClass = codeElement.className.match(/language-(\w+)/);
            const language = languageClass ? languageClass[1] : 'plaintext';
            const segment = {
                code: codeElement.textContent,
                language: language
            };

            if (group.length === 0) {
                placeholder = document.createElement('div');
                placeholder.className = 'editor';
                codeElement.parentNode.parentNode.insertBefore(placeholder, codeElement.parentNode);
            }

            group.push(segment);

            if (!codeElement.parentNode.nextElementSibling || !codeElements[index + 1] || codeElement.parentNode.nextElementSibling !== codeElements[index + 1].parentNode) {
                groupedBlocks.push({ location: placeholder, segments: group });
                group = [];
                placeholder = null;
            }
        });

        return groupedBlocks;
    }

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        resetEditors();
        resetButtons();

        groupCodeBlocks().forEach((block, blockIndex) => {
            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'flex space-x-2 pb-4 rounded-lg font-mono buttonDiv';
            block.location.parentNode.insertBefore(buttonDiv, block.location);

            block.segments.forEach((segment, segmentIndex) => {
                const language = segment.language;
                const code = segment.code;

                const button = document.createElement('button');
                buttonDiv.appendChild(button);
                button.setAttribute('id', `editor-button-${blockIndex}-${segmentIndex}`);
                button.textContent = language;

                if(segmentIndex === 0) {
                    button.className = `px-4 py-2 text-white rounded-lg bg-gray-700`;
                } else {
                    button.className = `px-4 py-2 text-white rounded-lg bg-gray-900`;
                }

                button.addEventListener('click', () => {
                    if(!button.classList.contains('bg-gray-700')) {
                        document.querySelectorAll('.buttonDiv button').forEach((button) => {
                            if(button.id.includes(`editor-button-${blockIndex}`)) {
                                button.classList.remove('bg-gray-700');
                                button.classList.add('bg-gray-900');
                            }
                        });

                        button.classList.remove('bg-gray-900');
                        button.classList.add('bg-gray-700');

                        document.querySelectorAll('.editor-container').forEach((editor) => {
                            if(editor.id === `editor-container-${blockIndex}-${segmentIndex}`) {
                                editor.style.display = 'block';
                            } else if(editor.id.includes(`editor-container-${blockIndex}`)) {
                                editor.style.display = 'none';
                            }
                        });
                    }
                });

                const container = document.createElement('div');
                container.setAttribute('id', `editor-container-${blockIndex}-${segmentIndex}`);
                container.className = 'editor-container';
                container.style.borderRadius = '20px';
                container.style.padding = '20px';
                container.style.backgroundColor = '#111827';

                if(segmentIndex !== 0){
                    container.style.display = 'none';
                }

                new EditorView({
                    state: EditorState.create({
                        doc: code,
                        extensions: [basicSetup, oneDarkModified, languageExtensions[language] || []],
                    }),
                    parent: container
                });

                block.location.appendChild(container);
            });
        });
    }, [currentTaskIndex]);


    useEffect(() => {
        let timer;
        if (timerStarted) {
            timer = setInterval(() => {
                setTimePassed(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timerStarted]);

    const handleStartTask = () => {
        setTimerStarted(true);
    };

    const handleNextTask = () => {
        if (!validateCurrentTask()) {
            alert('Kérlek az összes kérdésre válaszolj!');
            return;
        }

        if (currentTaskIndex < tasks.length - 1) {
            setCurrentTaskIndex(currentTaskIndex + 1);
        } else {
            const data = {
                assignment_id: assignment.id,
                tasks: tasks.map(task => ({
                    id: task.id,
                    questions: task.questions.map(question => ({
                        id: question.id,
                        answer: answers[question.id]
                    }))
                })),
                time: timePassed
            };
            console.log(data);
            axios.post('/algoritmizator/api/task/submit', data)
                .then(response => {
                    window.location.href = `/algoritmizator/lessons/task/attempt/${response.data.attempt_id}`;
                })
                .catch(error => {
                    alert(error);
                });
        }
    };

    const validateCurrentTask = () => {
        const currentTask = tasks[currentTaskIndex];
        return currentTask.questions.every(question => {
            const answer = answers[question.id];
            if (currentTask.type === 'result') {
                return answer !== undefined && answer.trim() !== '';
            }
            return answer !== undefined;
        });
    };

    const handleAnswerChange = (questionId, value) => {
        setAnswers({
            ...answers,
            [questionId]: value
        });
    };

    const renderTaskContent = (task) => {
        return (
            <div>
                <div className="mb-6">
                    <ReactMarkdown className="break-all">{task.markdown}</ReactMarkdown>
                </div>
                {task.questions.map((question, qIndex) => (
                    <div key={qIndex} className="mb-8 bg-gray-900 rounded-lg pb-4 pl-5 pr-5">
                        <div className="mb-8 pt-1 border-b-2 border-white">
                            <ReactMarkdown className="break-all">{question.markdown}</ReactMarkdown>
                        </div>
                        {task.type === 'true_false' && (
                            question.answers.map((answer, aIndex) => (
                                <label key={aIndex} className="block mb-2">
                                    <input
                                        type="radio"
                                        name={`question-${qIndex}`}
                                        value={answer.id}
                                        checked={answers[question.id] === answer.id}
                                        onChange={() => handleAnswerChange(question.id, answer.id)}
                                        className="mr-2"
                                    />
                                    {answer.answer}
                                </label>
                            ))
                        )}
                        {task.type === 'quiz' && (
                            question.answers.map((answer, aIndex) => (
                                <label key={aIndex} className="block mb-2">
                                    <input
                                        type="radio"
                                        name={`question-${qIndex}`}
                                        value={answer.id}
                                        checked={answers[question.id] === answer.id}
                                        onChange={() => handleAnswerChange(question.id, answer.id)}
                                        className="mr-2"
                                    />
                                    {answer.answer}
                                </label>
                            ))
                        )}
                        {task.type === 'checkbox' && (
                            question.answers.map((answer, aIndex) => (
                                <label key={aIndex} className="block mb-2">
                                    <input
                                        type="checkbox"
                                        name={`question-${qIndex}`}
                                        value={answer.id}
                                        checked={Array.isArray(answers[question.id]) && answers[question.id].includes(answer.id)}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setAnswers({
                                                ...answers,
                                                [question.id]: checked
                                                    ? [...(answers[question.id] || []), answer.id]
                                                    : (answers[question.id] || []).filter(id => id !== answer.id)
                                            });
                                        }}
                                        className="mr-2"
                                    />
                                    {answer.answer}
                                </label>
                            ))
                        )}
                        {task.type === 'result' && (
                            <input
                                type="text"
                                name={`question-${qIndex}`}
                                value={answers[question.id] || ''}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                className="px-4 py-2 w-full text-2xl rounded-lg bg-gray-700 text-white"
                                placeholder="Válasz..."
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const currentTask = tasks[currentTaskIndex];
    const progress = (currentTaskIndex) / (tasks.length - 1) * 100;

    return (
        <div>
            <Navbar title={title} activeTab={activeTab} />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 p-5">
                <div className="markdown w-full max-w-4xl bg-gray-800 text-white rounded-lg shadow-lg p-8">
                    <div className="w-full h-2 relative">
                        <div className="flex justify-between absolute top-0 left-0 w-full">
                            {tasks.map((task, index) => (
                                <div className="z-20">
                                    <br></br>
                                    <div key={index}
                                         className={`w-4 h-4 rounded-full ${index <= currentTaskIndex ? 'bg-green-500' : 'bg-gray-300'}`}
                                         style={{marginLeft: index === 0 ? '0' : '-8px'}}></div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full bg-gray-300 h-2 absolute top-0 left-0 mt-7"></div>
                    </div>
                    <div className="w-full bg-green-500 h-2 relative mt-5 mb-5" style={{width: `${progress}%`}}></div>
                    {!timerStarted ? (
                        <div className="text-center mt-5 mb-8">
                            <h2 className="text-3xl font-bold mb-4">{assignment.title}</h2>
                            <div className="mb-4">
                                <ReactMarkdown className="break-all">{assignment.markdown}</ReactMarkdown>
                            </div>
                            <button onClick={handleStartTask}
                                    className="px-6 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900">Feladat
                                indítása
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-4">{currentTask.title}</h3>
                                <p className="text-lg text-gray-300 mb-4">Eltelt
                                    idő: {new Date(timePassed * 1000).toISOString().substring(11, 19)}</p>
                            </div>
                            {renderTaskContent(currentTask)}
                            <div className="text-center mt-8">
                                <button onClick={handleNextTask}
                                        className="px-6 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900">
                                    {currentTaskIndex < tasks.length - 1 ? 'Következő feladat' : 'Feladat beküldése'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
});

export default Task;