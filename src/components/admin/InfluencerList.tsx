import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { InfluencerService } from "@/lib/services/influencer-service";
import { useToast } from "@/hooks/use-toast";
import { type Influencer } from "@/types/influencer";
import { InfluencerForm } from "./InfluencerForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function InfluencerList() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingInfluencer, setEditingInfluencer] = useState<Influencer | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    loadInfluencers();
  }, []);

  const loadInfluencers = async () => {
    try {
      const data = await InfluencerService.getAll();
      setInfluencers(data);
    } catch (error) {
      toast({
        title: "Error loading influencers",
        description: error instanceof Error ? error.message : "Failed to load influencers",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await InfluencerService.delete(id);
      await loadInfluencers();
      toast({
        title: "Influencer deleted",
        description: "The influencer has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error deleting influencer",
        description: error instanceof Error ? error.message : "Failed to delete influencer",
        variant: "destructive",
      });
    }
    setDeleteId(null);
  };

  const handleEdit = (influencer: Influencer) => {
    setEditingInfluencer(influencer);
  };

  const handleFormClose = () => {
    setEditingInfluencer(undefined);
    loadInfluencers();
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Influencer</TableHead>
            <TableHead>Specialties</TableHead>
            <TableHead>Followers</TableHead>
            <TableHead>Recipes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {influencers.map((influencer) => (
            <TableRow key={influencer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={influencer.avatar} />
                    <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{influencer.name}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                      {influencer.bio}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {influencer.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{influencer.total_subscribers.toLocaleString()}</TableCell>
              <TableCell>{influencer.recipesCount}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEdit(influencer)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setDeleteId(influencer.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <InfluencerForm 
        open={!!editingInfluencer} 
        onOpenChange={handleFormClose}
        editingInfluencer={editingInfluencer}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the influencer and all their recipes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}