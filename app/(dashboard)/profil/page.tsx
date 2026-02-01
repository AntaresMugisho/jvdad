"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  bio: string;
  avatar: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem("asbl-profile");
    return saved
      ? JSON.parse(saved)
      : {
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean.dupont@asbl.org",
        organization: "ASBL Example",
        bio: "Administrateur de l'ASBL",
        avatar: "",
      };
  });

  const { toast } = useToast();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("asbl-profile", JSON.stringify(profile));
    toast({ title: "Profil mis à jour avec succès" });
  };

  const getInitials = () => {
    return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-semibold">Profil</h1>
        <p className="text-muted-foreground mt-1">
          Gérez vos informations personnelles
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            <div>
              <Label htmlFor="avatar" className="cursor-pointer">
                <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Upload className="h-4 w-4" />
                  Changer la photo
                </div>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  data-testid="input-avatar"
                />
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG ou GIF, max 5 Mo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
                required
                data-testid="input-firstname"
              />
            </div>

            <div>
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
                required
                data-testid="input-lastname"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              required
              data-testid="input-email"
            />
          </div>

          <div>
            <Label htmlFor="organization">Organisation</Label>
            <Input
              id="organization"
              value={profile.organization}
              onChange={(e) =>
                setProfile({ ...profile, organization: e.target.value })
              }
              data-testid="input-organization"
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) =>
                setProfile({ ...profile, bio: e.target.value })
              }
              rows={4}
              placeholder="Quelques mots sur vous..."
              data-testid="input-bio"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" data-testid="button-save-profile">
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
