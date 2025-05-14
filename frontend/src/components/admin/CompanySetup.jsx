import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import axios from 'axios';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null // Reset file input when editing
            });
        }
    }, [singleCompany]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
    
        const formData = {
            name: input.name,
            description: input.description,
            website: input.website,
            location: input.location
          };
          
        try {
            setLoading(true);
            console.log(" start ");
            const token = localStorage.getItem('token');
             console.log(params.id);
             let res = await fetch(
                `${COMPANY_API_END_POINT}/update/${params.id}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            );
            console.log(" end ");
           res = await res.json();
           console.log(res.success);
            if (res.success) {
                toast.success(res.message);
                navigate("/admin/companies");
            } else {
                toast.error(res.data.message || 'An error occurred');
            }
        } catch (error) {
            console.error(error);
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };
    
    
    

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        {/* <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div> */}
                    </div>
                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Update</Button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CompanySetup;
