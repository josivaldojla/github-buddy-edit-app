
import { useState, useEffect } from "react";
import { Service, Mechanic, ViewMode } from "@/lib/types";
import { getServices, getMechanics, addService, updateService, deleteService } from "@/lib/storage";
import ServiceList from "@/components/services/ServiceList";
import SelectedServicesList from "@/components/checkout/SelectedServicesList";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";

const CheckoutPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const servicesData = await getServices();
        const mechanicsData = await getMechanics();
        
        setServices(servicesData);
        setMechanics(mechanicsData);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Erro ao carregar os dados');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleAddService = async (service: Service) => {
    try {
      const updatedServices = await addService(service);
      setServices(updatedServices);
      toast.success(`Serviço ${service.name} adicionado com sucesso`);
    } catch (error) {
      console.error('Erro ao adicionar serviço:', error);
      toast.error('Erro ao adicionar serviço');
    }
  };

  const handleUpdateService = async (service: Service) => {
    try {
      const updatedServices = await updateService(service);
      setServices(updatedServices);
      toast.success(`Serviço ${service.name} atualizado com sucesso`);
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      toast.error('Erro ao atualizar serviço');
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const updatedServices = await deleteService(id);
      setServices(updatedServices);
      toast.success('Serviço removido com sucesso');
    } catch (error) {
      console.error('Erro ao remover serviço:', error);
      toast.error('Erro ao remover serviço');
    }
  };

  const handleAddToSelection = (service: Service, comment?: string) => {
    setSelectedServices(prev => [
      ...prev,
      comment 
        ? { ...service, comment } 
        : { ...service }
    ]);
    const msg = comment 
      ? `${service.name} adicionado à seleção com comentário`
      : `${service.name} adicionado à seleção`;
    toast.success(msg);
  };

  const handleRemoveService = (id: string) => {
    setSelectedServices(selectedServices.filter(service => service.id !== id));
  };

  const handleCompleteCheckout = () => {
    setSelectedServices([]);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-muted-foreground">Carregando...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Serviços Executados</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <ServiceList
                services={services}
                onAddService={handleAddService}
                onUpdateService={handleUpdateService}
                onDeleteService={handleDeleteService}
                selectable={true}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onAddToSelection={handleAddToSelection}
                showAddButton={true}
                hideHeading={true}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <SelectedServicesList 
              selectedServices={selectedServices}
              mechanics={mechanics}
              onRemoveService={handleRemoveService}
              onCompleteCheckout={handleCompleteCheckout}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
