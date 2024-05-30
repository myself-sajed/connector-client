import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent } from 'react';

type StepOneFieldsProps<T> = {
    handleInputChange: (e: ChangeEvent<HTMLInputElement>, key: keyof T) => void;
    formData: T;
};

const StepOneFields = <T extends Record<string, any>>({
    handleInputChange,
    formData,
}: StepOneFieldsProps<T>) => {
    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    onChange={(e) => handleInputChange(e, 'name')}
                    value={formData['name']}
                    type="text"
                    placeholder="Shaikh Sajed"
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    onChange={(e) => handleInputChange(e, 'email')}
                    value={formData['email']}
                    type="email"
                    placeholder="m@example.com"
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="bio">Bio (optional)</Label>
                <Input
                    onChange={(e) => handleInputChange(e, 'bio')}
                    value={formData['bio']}
                    type="text"
                    placeholder="What is in your mind..."
                />
            </div>
        </>
    );
};

export default StepOneFields;
