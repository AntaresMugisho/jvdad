"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, MapPin, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface Address {
    id: string;
    street: string;
    city: string;
    country: string;
    isPrincipal: boolean;
}

interface CompanyInfo {
    name: string;
    addresses: Address[];
}

export default function CompanyInfoPage() {
    const [info, setInfo] = useState<CompanyInfo>({
        name: "JVDAD",
        addresses: [
            {
                id: "1",
                street: "Centre de NYANKUNDE",
                city: "Territoire d’Irumu, Province de l’Ituri",
                country: "République Démocratique du Congo",
                isPrincipal: true,
            },
        ],
    });

    const { toast } = useToast();

    useEffect(() => {
        const saved = localStorage.getItem("jvdad-company-info");
        if (saved) {
            setInfo(JSON.parse(saved));
        }
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("jvdad-company-info", JSON.stringify(info));
        toast({ title: "Informations de l'entreprise enregistrées" });
    };

    const addAddress = () => {
        const newAddress: Address = {
            id: Math.random().toString(36).substr(2, 9),
            street: "",
            city: "",
            country: "",
            isPrincipal: info.addresses.length === 0,
        };
        setInfo({ ...info, addresses: [...info.addresses, newAddress] });
    };

    const removeAddress = (id: string) => {
        setInfo({
            ...info,
            addresses: info.addresses.filter((addr) => addr.id !== id),
        });
    };

    const updateAddress = (id: string, updates: Partial<Address>) => {
        setInfo({
            ...info,
            addresses: info.addresses.map((addr) => {
                if (addr.id === id) {
                    if (updates.isPrincipal) {
                        // Only one can be principal
                        return { ...addr, ...updates };
                    }
                    return { ...addr, ...updates };
                }
                if (updates.isPrincipal) {
                    return { ...addr, isPrincipal: false };
                }
                return addr;
            }),
        });
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-3xl font-semibold">Information de l'Entreprise</h1>
                <p className="text-muted-foreground mt-1">
                    Gérez le nom et les adresses de votre organisation
                </p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                <Card className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <Building2 className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">Identité</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="companyName">Nom de l'entreprise</Label>
                            <Input
                                id="companyName"
                                value={info.name}
                                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                                placeholder="Ex: JVDAD"
                                required
                            />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <MapPin className="h-6 w-6 text-primary" />
                            <h2 className="text-xl font-semibold">Adresses</h2>
                        </div>
                        <Button type="button" variant="secondary" size="sm" onClick={addAddress} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Ajouter une adresse
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {info.addresses.map((addr, index) => (
                            <div key={addr.id} className="p-4 border rounded-lg bg-slate-50 relative group">
                                <div className="absolute top-4 right-4 flex items-center gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`principal-${addr.id}`}
                                            checked={addr.isPrincipal}
                                            onCheckedChange={(checked) =>
                                                updateAddress(addr.id, { isPrincipal: !!checked })
                                            }
                                        />
                                        <Label htmlFor={`principal-${addr.id}`} className="text-sm font-normal cursor-pointer">
                                            Adresse principale
                                        </Label>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                                        onClick={() => removeAddress(addr.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                    <div className="md:col-span-2">
                                        <Label>Rue / Quartier / Centre</Label>
                                        <Input
                                            value={addr.street}
                                            onChange={(e) => updateAddress(addr.id, { street: e.target.value })}
                                            placeholder="Ex: Centre de NYANKUNDE"
                                        />
                                    </div>
                                    <div>
                                        <Label>Ville / Territoire / Province</Label>
                                        <Input
                                            value={addr.city}
                                            onChange={(e) => updateAddress(addr.id, { city: e.target.value })}
                                            placeholder="Ex: Territoire d’Irumu"
                                        />
                                    </div>
                                    <div>
                                        <Label>Pays</Label>
                                        <Input
                                            value={addr.country}
                                            onChange={(e) => updateAddress(addr.id, { country: e.target.value })}
                                            placeholder="Ex: République Démocratique du Congo"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {info.addresses.length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">Aucune adresse enregistrée</p>
                                <Button type="button" variant="ghost" onClick={addAddress}>
                                    Ajouter votre première adresse
                                </Button>
                            </div>
                        )}
                    </div>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" size="lg" className="px-8">
                        Enregistrer les modifications
                    </Button>
                </div>
            </form>
        </div>
    );
}
