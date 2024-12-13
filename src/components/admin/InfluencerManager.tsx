import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InfluencerForm } from "./InfluencerForm";
import { InfluencerList } from "./InfluencerList";

export function InfluencerManager() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Influencers</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Influencer
        </Button>
      </div>

      <InfluencerList />
      
      <InfluencerForm 
        open={showForm} 
        onOpenChange={setShowForm}
      />
    </div>
  );
}