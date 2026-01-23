"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/Button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shield, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const { toast } = useToast();

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères",
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Mot de passe modifié avec succès" });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-semibold">Sécurité</h1>
        <p className="text-muted-foreground mt-1">
          Gérez les paramètres de sécurité de votre compte
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <Key className="h-6 w-6 text-muted-foreground mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Changer le mot de passe</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Mettez à jour votre mot de passe régulièrement pour plus de sécurité
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <Label htmlFor="current">Mot de passe actuel</Label>
            <Input
              id="current"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              data-testid="input-current-password"
            />
          </div>

          <div>
            <Label htmlFor="new">Nouveau mot de passe</Label>
            <Input
              id="new"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              data-testid="input-new-password"
            />
          </div>

          <div>
            <Label htmlFor="confirm">Confirmer le mot de passe</Label>
            <Input
              id="confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              data-testid="input-confirm-password"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" data-testid="button-change-password">
              Changer le mot de passe
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <Shield className="h-6 w-6 text-muted-foreground mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Paramètres de sécurité</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Configurez les options de sécurité avancées
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Authentification à deux facteurs</Label>
              <p className="text-sm text-muted-foreground">
                Ajoutez une couche de sécurité supplémentaire à votre compte
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
              data-testid="switch-2fa"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Déconnexion automatique</Label>
              <p className="text-sm text-muted-foreground">
                Déconnectez-vous automatiquement après 30 minutes d'inactivité
              </p>
            </div>
            <Switch
              checked={sessionTimeout}
              onCheckedChange={setSessionTimeout}
              data-testid="switch-timeout"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
