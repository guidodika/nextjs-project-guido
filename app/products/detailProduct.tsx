'use client'
import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation"

type Product = {
    id: number,
    title: string,
    price: number
}

export default function DetailProduct(product: Product) {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [modal, setModal] = useState(false)

    const router = useRouter();

    async function handleDetail(e: SyntheticEvent) {
        e.preventDefault();
        await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price,
            })
        })

        setTitle("");
        setPrice("");
        router.refresh();
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <div>
            <button className="btn btn-sm" onClick={handleChange}>Detail</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text lg">Detail Product</h3>
                    <form onSubmit={handleDetail} >
                        <div className="flex flex-col py-2" >
                            <label className="font-bold">Product Name</label>
                            <p>{product.title}</p>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-bold">Price</label>
                            <p>{product.price}</p>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>Close</button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}