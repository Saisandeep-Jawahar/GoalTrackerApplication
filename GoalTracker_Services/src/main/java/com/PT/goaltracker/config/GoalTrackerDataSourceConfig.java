package com.gtView.goaltracker.config;

import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(basePackages = "com.gtView.goaltracker.repository", 
    transactionManagerRef = "goalTrackerTransactionManager",
	entityManagerFactoryRef = "goalTrackerEntityManagerFactory")
public class GoalTrackerDataSourceConfig {
	@Autowired
	private Environment env;

	@Bean
	@Primary
	@ConfigurationProperties(prefix = "goaltracker-db.datasource")
	public DataSourceProperties goalTrackerDataSourceProperties() {
		return new DataSourceProperties();
	}
	
	@Bean
	public PlatformTransactionManager goalTrackerTransactionManager() {
		EntityManagerFactory factory = goalTrackerEntityManagerFactory().getObject();
		return new JpaTransactionManager(factory);
	}

	@Bean
	public LocalContainerEntityManagerFactoryBean goalTrackerEntityManagerFactory() {
		LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
		factory.setDataSource(goalTrackerDataSource());
		factory.setPackagesToScan(
				new String[] { "com.gtView.goaltracker.entity" });
		factory.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

		Properties jpaProperties = new Properties();
		jpaProperties.put("hibernate.hbm2ddl.auto", env.getProperty("spring.jpa.hibernate.ddl-auto"));
		jpaProperties.put("hibernate.show-sql", env.getProperty("spring.jpa.show-sql"));
		factory.setJpaProperties(jpaProperties);

		return factory;
	}

	@Bean
	public DataSource goalTrackerDataSource() {
		DataSourceProperties galTrackerDataSourceProperties = goalTrackerDataSourceProperties();
		return DataSourceBuilder.create().driverClassName(galTrackerDataSourceProperties.getDriverClassName())
				.url(galTrackerDataSourceProperties.getUrl()).username(galTrackerDataSourceProperties.getUsername())
				.password(galTrackerDataSourceProperties.getPassword()).build();
	}

}
