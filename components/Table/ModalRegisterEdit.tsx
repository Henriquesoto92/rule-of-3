import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Modal, TextInput } from '@mantine/core';
import { IJob } from './types';

interface ModalRegisterEditProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: IJob) => void;
  defaultValues?: IJob;
}

const schema = z.object({
  jobTitle: z.string().min(1, 'Título é obrigatório'),
  company: z.string().min(1, 'Empresa é obrigatória'),
  link: z.string().optional(),
  contact: z.string().optional(),
  applicationDate: z.string().optional(),
  status: z.string().min(1, 'Status é obrigatório'),
  resumeUsed: z.string().optional(),
  source: z.string().optional(),
  location: z.string().optional(),
  salary: z.string().optional(),
  expectedFeedbackDate: z.string().optional(),
  notes: z.string().optional(),
  processStage: z.string().optional(),
  priority: z.string().optional(),
  documentsSent: z.array(z.string()).optional(),
});

export function ModalRegisterEdit({
  opened,
  onClose,
  onSubmit,
  defaultValues,
}: ModalRegisterEditProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJob>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={defaultValues ? 'Editar Vaga' : 'Registrar Vaga'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Título da Vaga"
          {...register('jobTitle')}
          error={errors.jobTitle?.message}
          required
        />
        <TextInput
          label="Empresa"
          {...register('company')}
          error={errors.company?.message}
          required
        />
        <TextInput label="Link da Vaga" {...register('link')} />
        <TextInput label="Contato" {...register('contact')} />
        <TextInput label="Data de Candidatura" {...register('applicationDate')} />
        <TextInput label="Status" {...register('status')} error={errors.status?.message} required />
        <TextInput label="Currículo Usado" {...register('resumeUsed')} />
        <TextInput label="Fonte" {...register('source')} />
        <TextInput label="Localização" {...register('location')} />
        <TextInput label="Salário" {...register('salary')} />
        <TextInput label="Data de Feedback Esperado" {...register('expectedFeedbackDate')} />
        <TextInput label="Notas" {...register('notes')} />
        <TextInput label="Etapa do Processo" {...register('processStage')} />
        <TextInput label="Prioridade" {...register('priority')} />

        <Button type="submit" fullWidth mt="16px">
          {defaultValues ? 'Atualizar Vaga' : 'Adicionar Vaga'}
        </Button>
      </form>
    </Modal>
  );
}
