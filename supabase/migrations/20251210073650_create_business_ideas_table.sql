/*
  # Criar tabela de ideias de negócios

  1. Nova Tabela
    - `business_ideas`
      - `id` (uuid, chave primária)
      - `area_interesse` (texto, área de interesse do usuário)
      - `tempo_disponivel` (texto, tempo disponível)
      - `investimento` (texto, nível de investimento)
      - `tipo_negocio` (texto, tipo de negócio desejado)
      - `outras_preferencias` (jsonb, outras preferências do usuário)
      - `ideias_geradas` (jsonb, array com as 10 ideias geradas)
      - `created_at` (timestamp, data de criação)
      
  2. Segurança
    - Habilita RLS na tabela `business_ideas`
    - Permite que usuários anônimos insiram ideias
    - Permite que usuários anônimos leiam suas próprias ideias
*/

CREATE TABLE IF NOT EXISTS business_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  area_interesse text NOT NULL,
  tempo_disponivel text NOT NULL,
  investimento text NOT NULL,
  tipo_negocio text NOT NULL,
  outras_preferencias jsonb DEFAULT '{}'::jsonb,
  ideias_geradas jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE business_ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir inserção pública"
  ON business_ideas
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Permitir leitura pública"
  ON business_ideas
  FOR SELECT
  TO anon
  USING (true);