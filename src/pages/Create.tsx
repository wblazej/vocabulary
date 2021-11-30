import { useState } from 'react';
import Delete from '../icons/Delete';
import Plus from '../icons/Plus';
import Storage from '../ts/storage';
import './../styles/create.scss';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Create = () => {
    const [storage] =  useState(new Storage())

    const [step, setStep] = useState(1)
    const [name, setName] = useState("")
    const [fields, setFields] = useState<Array<string>>([])
    const [words, setWords] = useState<Array<Array<string>>>([])

    const next = () => {
        if (step === 1)
            if (!name) return toast.error("Game name is required")

        if (step === 2) {
            if (fields.length < 2) return toast.error("At least 2 fields are required")
            if (fields.filter(field => field === '').length) return toast.error("Any field cannot be blank")
        }

        if (step === 3) {
            if (words.length < 1) return toast.error("At least 1 word is required")
            if (words.filter(word => word.filter(translation => translation === '').length).length) 
                return toast.error("Any word translation field cannot be blank")

            storage.createGame({
                id: storage.generateUUID(),
                name: name,
                created_at: Date.now(),
                fields: fields,
                words: words
            })

            toast.success("Game created successfully")
        }
        
        setStep(step => step < 4 ? step + 1 : step)
    }

    const updateWord = (x: number, y: number, value: string) => {
        setWords(words => words.map((word, word_i) => (
            word_i === y ? word.map((translation, translation_i) => (
                translation_i === x ? value : translation
            )) : word))
        )
    }

    const updateField = (i: number, value: string) => 
        setFields(fields => fields.map((field, field_i) => i === field_i ? value : field))

    const removeField = (i: number) =>
        setFields(fields => fields.filter((field, field_i) => i !== field_i))

    const removeWord = (i: number) =>
        setWords(words => words.filter((word, word_i) => word_i !== i))

    return (
        <div className="create-game-container">
            {step === 1 && 
                <div className="step">
                    <h1>Create name of new game</h1>
                    <div className="input-container">
                        <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                    </div>
                </div>
            }

            {step === 2 &&
                <div className="step">
                    <h1>Add fields</h1>
                    {fields.map((field, i) => 
                        <div className="input-container" key={i}>
                            <input type="text" value={fields[i]} onChange={(e) => updateField(i, e.currentTarget.value)}/>
                            <div className="remove-button" onClick={() => removeField(i)}><Delete/></div>
                        </div>
                    )}

                    <div onClick={() => setFields(fields => [...fields, ""])} className="add-button"><Plus/></div>
                </div>
            }

            {step === 3 &&
                <div className="step">
                    <h1>Add words to fields</h1>
                    <div className="fields-names">
                        {fields.map((field, i) => <div className="name" key={i}>{field}</div>)}
                    </div>
                    <div className="words">
                        {words.map((word, word_index) => (
                            <div className="word" key={word_index}>
                                {fields.map((field, field_index) => <input value={words[word_index][field_index]} key={field_index} type="text" onChange={
                                    (e) => updateWord(field_index, word_index, e.currentTarget.value)
                                } />)}
                                <div className="remove-button" onClick={() => removeWord(word_index)}><Delete/></div>
                            </div>
                        ))}
                    </div>
                    <div 
                        onClick={() => setWords(words => [...words, Array(fields.length).fill('')])} 
                        className="add-button">
                        <Plus/>
                    </div>
                </div>
            }

            {step === 4 && 
                <div className="step">
                    <h1>Game created</h1>
                    <p>Click button below to return to home page</p>
                    <div className="buttons">
                        <Link to="/" className="button">Home page</Link>
                    </div>
                </div>
            }

            {step !== 4 &&
                <div className="buttons">
                    <button onClick={next}>Next</button>
                </div>
            }
        </div>
    )
}

export default Create;
